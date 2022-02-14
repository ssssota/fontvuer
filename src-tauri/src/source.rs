use font_kit::error::SelectionError;
use font_kit::family_handle::FamilyHandle;
use font_kit::file_type::FileType;
use font_kit::font::Font;
use font_kit::handle::Handle;
use font_kit::source::Source;
use std::any::Any;
use std::fs::File;
use std::path::Path;
use walkdir::WalkDir;

pub struct CustomDirSource {
    fonts: Vec<Handle>,
}

impl CustomDirSource {
    pub fn new<P>(dir: P) -> CustomDirSource
    where
        P: AsRef<Path>,
    {
        let mut fonts = vec![];
        for directory_entry in WalkDir::new(dir).into_iter() {
            let directory_entry = match directory_entry {
                Ok(directory_entry) => directory_entry,
                Err(_) => continue,
            };
            let path = directory_entry.path();
            let mut file = match File::open(path) {
                Err(_) => continue,
                Ok(file) => file,
            };
            match Font::analyze_file(&mut file) {
                Err(_) => continue,
                Ok(FileType::Single) => fonts.push(Handle::from_path(path.to_owned(), 0)),
                Ok(FileType::Collection(font_count)) => {
                    for font_index in 0..font_count {
                        fonts.push(Handle::from_path(path.to_owned(), font_index))
                    }
                }
            }
        }

        CustomDirSource { fonts }
    }

    /// Returns paths of all fonts installed on the system.
    pub fn all_fonts(&self) -> Result<Vec<Handle>, SelectionError> {
        Ok(self.fonts.to_vec())
    }

    /// Returns the names of all families installed on the system.
    pub fn all_families(&self) -> Result<Vec<String>, SelectionError> {
        unimplemented!();
    }

    /// Looks up a font family by name and returns the handles of all the fonts in that family.
    pub fn select_family_by_name(
        &self,
        _family_name: &str,
    ) -> Result<FamilyHandle, SelectionError> {
        unimplemented!();
    }

    /// Selects a font by PostScript name, which should be a unique identifier.
    ///
    /// This implementation does a brute-force search of installed fonts to find the one that
    /// matches.
    pub fn select_by_postscript_name(
        &self,
        _postscript_name: &str,
    ) -> Result<Handle, SelectionError> {
        unimplemented!();
    }
}

impl Source for CustomDirSource {
    #[inline]
    fn all_fonts(&self) -> Result<Vec<Handle>, SelectionError> {
        self.all_fonts()
    }

    #[inline]
    fn all_families(&self) -> Result<Vec<String>, SelectionError> {
        self.all_families()
    }

    fn select_family_by_name(&self, family_name: &str) -> Result<FamilyHandle, SelectionError> {
        self.select_family_by_name(family_name)
    }

    fn select_by_postscript_name(&self, postscript_name: &str) -> Result<Handle, SelectionError> {
        self.select_by_postscript_name(postscript_name)
    }

    #[inline]
    fn as_any(&self) -> &dyn Any {
        self
    }

    #[inline]
    fn as_mut_any(&mut self) -> &mut dyn Any {
        self
    }
}
