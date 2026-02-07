use tauri::Manager;
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial, NSVisualEffectState};
use std::io::Cursor;
use std::thread;

#[tauri::command]
fn play_notification(volume: f32) {
    thread::spawn(move || {
        let (_stream, stream_handle) = rodio::OutputStream::try_default().unwrap();
        let sink = rodio::Sink::try_new(&stream_handle).unwrap();
        
        // Embed the sound file at compile time
        let sound_data = include_bytes!("../../public/notification.mp3");
        let cursor = Cursor::new(sound_data.as_ref());
        let source = rodio::Decoder::new(cursor).unwrap();
        
        sink.set_volume(volume);
        sink.append(source);
        sink.sleep_until_end();
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![play_notification])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      #[cfg(target_os = "macos")]
      if let Some(window) = app.get_webview_window("main") {
        apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, Some(NSVisualEffectState::Active), None)
          .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
