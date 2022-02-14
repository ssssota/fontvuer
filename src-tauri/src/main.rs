#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use font_kit::{handle::Handle, font::Font};
use font_kit::source::SystemSource;
use serde::Serialize;
use source::CustomDirSource;
use std::collections::HashSet;
use std::fs;
use std::sync::Arc;
use ttf_parser::{Face, Style, Width, name_id};

mod source;

#[derive(Serialize, Hash, PartialEq, Eq)]
struct FontDescriptor {
    installed: bool,
    path: String,
    font_index: u32,
}
#[derive(Serialize)]
struct FontsResponse {
    fonts: Vec<FontDescriptor>,
}

impl FontDescriptor {
    pub fn from_handle(handle: &Handle, installed: bool) -> Option<FontDescriptor> {
        if let Handle::Path { path, font_index } = handle {
            return Some(FontDescriptor {
                installed,
                path: path.to_str()?.to_string(),
                font_index: *font_index,
            });
        }
        None
    }
}

#[tauri::command]
fn get_fonts(custom_dirs: Vec<String>, system_fonts: bool) -> Result<FontsResponse, String> {
    let mut fonts = HashSet::new();
    if system_fonts {
        if let Ok(handles) = SystemSource::new().all_fonts() {
            for h in handles {
                if let Some(d) = FontDescriptor::from_handle(&h, true) {
                    fonts.insert(d);
                }
            }
        }
    }
    for dir in custom_dirs {
        if let Ok(handles) = CustomDirSource::new(dir).all_fonts() {
            for h in handles {
                if let Some(d) = FontDescriptor::from_handle(&h, false) {
                    fonts.insert(d);
                }
            }
        }
    }
    Ok(FontsResponse {
        fonts: fonts.into_iter().collect(),
    })
}

#[derive(Serialize)]
struct SystemFont {
    path: String,
    /// font index for TTC
    index: u32,
    family: String,
    postscript: Option<String>,
    full: String,
    style: String,
    /// (width) 50 ~ 200 [%]
    stretch: f32,
    /// 100~900
    weight: u16,
}

#[tauri::command]
fn get_font_from_system(path: String, font_index: u32) -> Result<SystemFont, String> {
    let data = fs::read(&path).map_err(|e| e.to_string())?;
    let face = Face::from_slice(&data, font_index).map_err(|e| e.to_string())?;
    let font = Font::from_bytes(Arc::new(data), font_index).map_err(|e| e.to_string())?;
    let names = face.names();
    Ok(SystemFont {
        path,
        index: font_index,
        family: font.family_name(),
        postscript: font.postscript_name(),
        full: font.full_name(),
        style: match face.style() {
            Style::Normal => "normal".to_string(),
            Style::Italic => "italic".to_string(),
            Style::Oblique => "oblique".to_string(),
        },
        stretch: match face.width() {
            Width::UltraCondensed => 50.0,
            Width::ExtraCondensed => 62.5,
            Width::Condensed => 75.0,
            Width::SemiCondensed => 87.5,
            Width::Normal => 100.0,
            Width::SemiExpanded => 112.5,
            Width::Expanded => 125.0,
            Width::ExtraExpanded => 150.0,
            Width::UltraExpanded => 200.0,
        },
        weight: face.weight().to_number(),
    })
}

#[derive(Serialize)]
struct CustomDirFont {
    /// base64 font data
    data: String,
    path: String,
    /// font index for TTC
    index: u32,
    family: String,
    postscript: Option<String>,
    full: String,
    style: String,
    /// (width) 50 ~ 200 [%]
    stretch: f32,
    /// 100~900
    weight: u16,
}

#[tauri::command]
fn get_font_with_data(path: String, font_index: u32) -> Result<CustomDirFont, String> {
    let data = fs::read(&path).map_err(|e| e.to_string())?;
    let face = Face::from_slice(&data, font_index).map_err(|e| e.to_string())?;
    let names = face.names();
    let font = Font::from_bytes(Arc::new(data), font_index).map_err(|e| e.to_string())?;
    Ok(CustomDirFont {
        data: base64::encode(&data),
        path,
        index: font_index,
        family: font.family_name(),
        postscript: font.postscript_name(),
        full: font.full_name(),
        style: match face.style() {
            Style::Normal => "normal".to_string(),
            Style::Italic => "italic".to_string(),
            Style::Oblique => "oblique".to_string(),
        },
        stretch: match face.width() {
            Width::UltraCondensed => 50.0,
            Width::ExtraCondensed => 62.5,
            Width::Condensed => 75.0,
            Width::SemiCondensed => 87.5,
            Width::Normal => 100.0,
            Width::SemiExpanded => 112.5,
            Width::Expanded => 125.0,
            Width::ExtraExpanded => 150.0,
            Width::UltraExpanded => 200.0,
        },
        weight: face.weight().to_number(),
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_fonts, get_font_from_system, get_font_with_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
