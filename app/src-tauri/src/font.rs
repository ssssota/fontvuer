use font_kit::font::Font;
use font_kit::handle::Handle;
use font_kit::loader::Loader;
use font_kit::properties::Style;
use font_kit::source::SystemSource;
use serde::Serialize;

#[tauri::command]
pub fn get_families_from_system_source() -> Result<Vec<String>, String> {
    SystemSource::new()
        .all_families()
        .map_err(|e| e.to_string())
}

#[derive(Serialize)]
pub struct FontFace {
    path: String,
    font_index: u32,
}

#[tauri::command]
pub fn get_family_faces(family_name: String) -> Result<Vec<FontFace>, String> {
    SystemSource::new()
        .select_family_by_name(&family_name)
        .map_err(|e| e.to_string())
        .map(|handle| {
            handle
                .fonts()
                .iter()
                .filter_map(|h| match h {
                    Handle::Memory {
                        bytes: _,
                        font_index: _,
                    } => None,
                    Handle::Path { path, font_index } => path.to_str().map(|s| FontFace {
                        path: s.to_string(),
                        font_index: *font_index,
                    }),
                })
                .collect()
        })
}

#[derive(Serialize)]
pub struct FontDescriptor {
    weight: f32,
    style: String,
    stretch: f32,
    monospace: bool,
    family_name: String,
    subfamily_name: Option<String>,
    full_name: String,
    version: Option<String>,
    postscript_name: Option<String>,
    trademark: Option<String>,
    manufacturer: Option<String>,
    designer: Option<String>,
    description: Option<String>,
    vendor_url: Option<String>,
    designer_url: Option<String>,
    license_description: Option<String>,
    license_info_url: Option<String>,
    sample_text: Option<String>,
}

#[tauri::command]
pub fn get_font_descriptor(path: String, font_index: u32) -> Result<FontDescriptor, String> {
    let font = Font::from_path(path, font_index).map_err(|e| e.to_string())?;
    let properties = font.properties();
    Ok(FontDescriptor {
        weight: properties.weight.0,
        style: match properties.style {
            Style::Normal => "normal".into(),
            Style::Italic => "italic".into(),
            Style::Oblique => "oblique".into(),
        },
        stretch: properties.stretch.0,
        monospace: font.is_monospace(),
        family_name: font.family_name(),
        subfamily_name: font.subfamily_name(),
        full_name: font.full_name(),
        version: font.version(),
        postscript_name: font.postscript_name(),
        trademark: font.trademark(),
        manufacturer: font.manufacturer(),
        designer: font.designer(),
        description: font.description(),
        vendor_url: font.vendor_url(),
        designer_url: font.designer_url(),
        license_description: font.license_description(),
        license_info_url: font.license_info_url(),
        sample_text: font.sample_text(),
    })
}
