#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use font_kit::loader::Loader;
use font_kit::source::SystemSource;
use font_kit::{font::Font, handle::Handle};
use serde::Serialize;
use source::CustomDirSource;
use std::collections::HashSet;
use std::fs;

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
    weight: f32,
    copyright: Option<String>,
    sampletext: Option<String>,
    license: Option<String>,
}

#[tauri::command]
fn get_font_from_system(path: String, font_index: u32) -> Result<SystemFont, String> {
    let font =
        Font::from_path(&path, font_index).map_err(|_| "Invalid path or index".to_string())?;
    Ok(SystemFont {
        path,
        index: font_index,
        family: font.family_name(),
        postscript: font.postscript_name(),
        full: font.full_name(),
        style: font.properties().style.to_string(),
        stretch: font.properties().stretch.0 * 100.0,
        weight: font.properties().weight.0,
        copyright: font.copyright_notice(),
        sampletext: font.sample_text(),
        license: font.license_description(),
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
    weight: f32,
    copyright: Option<String>,
    sampletext: Option<String>,
    license: Option<String>,
}

#[tauri::command]
fn get_font_with_data(path: String, font_index: u32) -> Result<CustomDirFont, String> {
    let data = fs::read(&path).map_err(|e| e.to_string())?;
    let data_text = base64::encode(&data);
    let font =
        Font::from_path(&path, font_index).map_err(|_| "Invalid path or index".to_string())?;
    Ok(CustomDirFont {
        data: data_text,
        path,
        index: font_index,
        family: font.family_name(),
        postscript: font.postscript_name(),
        full: font.full_name(),
        style: font.properties().style.to_string(),
        stretch: font.properties().stretch.0,
        weight: font.properties().weight.0,
        copyright: font.copyright_notice(),
        sampletext: font.sample_text(),
        license: font.license_description(),
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
