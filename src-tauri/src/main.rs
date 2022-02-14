#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use font_kit::handle::Handle;
use font_kit::source::SystemSource;
use serde::Serialize;
use source::CustomDirSource;
use std::collections::HashSet;
use std::fs;
use ttf_name_decoder::decode;
use ttf_parser::{name_id, Face, PlatformId, Style, Width};

mod source;

#[derive(Serialize, Hash, PartialEq, Eq, Debug)]
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
        println!("load system fonts");
        if let Ok(handles) = SystemSource::new().all_fonts() {
            for h in handles {
                if let Some(d) = FontDescriptor::from_handle(&h, true) {
                    println!("handle");
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
    println!("{:?}", fonts);
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
    let names = face.names();
    Ok(SystemFont {
        path,
        index: font_index,
        family: names
            .get(name_id::FAMILY)
            .map(|n| {
                decode(
                    n.name,
                    platform_id_to_num(n.platform_id),
                    n.encoding_id,
                    n.language_id,
                )
            })
            .flatten()
            .ok_or("err")?,
        postscript: names
            .get(name_id::POST_SCRIPT_NAME)
            .map(|n| {
                decode(
                    n.name,
                    platform_id_to_num(n.platform_id),
                    n.encoding_id,
                    n.language_id,
                )
            })
            .flatten(),
        full: names
            .get(name_id::FULL_NAME)
            .map(|n| {
                decode(
                    n.name,
                    platform_id_to_num(n.platform_id),
                    n.encoding_id,
                    n.language_id,
                )
            })
            .flatten()
            .ok_or("err")?,
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

fn platform_id_to_num(platform_id: PlatformId) -> u16 {
    match platform_id {
        PlatformId::Unicode => 0,
        PlatformId::Macintosh => 1,
        PlatformId::Iso => 2,
        PlatformId::Windows => 3,
        PlatformId::Custom => 4,
    }
}

#[tauri::command]
fn get_font_with_data(path: String, font_index: u32) -> Result<CustomDirFont, String> {
    let data = fs::read(&path).map_err(|e| e.to_string())?;
    let face = Face::from_slice(&data, font_index).map_err(|e| e.to_string())?;
    let names = face.names();
    Ok(CustomDirFont {
        data: base64::encode(&data),
        path,
        index: font_index,
        family: names
            .get(name_id::FAMILY)
            .map(|n| {
                decode(
                    n.name,
                    platform_id_to_num(n.platform_id),
                    n.encoding_id,
                    n.language_id,
                )
            })
            .flatten()
            .ok_or("err")?,
        postscript: names
            .get(name_id::POST_SCRIPT_NAME)
            .map(|n| {
                decode(
                    n.name,
                    platform_id_to_num(n.platform_id),
                    n.encoding_id,
                    n.language_id,
                )
            })
            .flatten(),
        full: names
            .get(name_id::FULL_NAME)
            .map(|n| {
                decode(
                    n.name,
                    platform_id_to_num(n.platform_id),
                    n.encoding_id,
                    n.language_id,
                )
            })
            .flatten()
            .ok_or("err")?,
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
        .invoke_handler(tauri::generate_handler![
            get_fonts,
            get_font_from_system,
            get_font_with_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
