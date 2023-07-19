#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde_json::json;
use tauri::Manager;
use url::Url;
use window_shadows::set_shadow;
use settimeout::set_timeout;
use std::time::Duration;

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    // Close splashscreen
    if let Some(splash) = window.get_window("splashscreen") {
        set_timeout(Duration::from_millis(100)).await;
        splash.close().unwrap();
    }

    // Show main window
    set_timeout(Duration::from_millis(500)).await;
    window.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
async fn set_window_shadow(window: tauri::Window) {
    #[cfg(any(windows, target_os = "windows"))]
    set_shadow(&window, true).unwrap();
}

fn main() {
    // prepare() checks if it's a single instance and tries to send the args otherwise.
    // It should always be the first line in your main function (with the exception of loggers or similar)
    tauri_plugin_deep_link::prepare("com.complexsolutions.flow");
    // It's expected to use the identifier from tauri.conf.json
    // Unfortuenetly getting it is pretty ugly without access to sth that implements `Manager`.

    tauri::Builder::default()
        .setup(|app| {
        // If you need macOS support this must be called in .setup() !
        // Otherwise this could be called right after prepare() but then you don't have access to tauri APIs
        let handle = app.handle();
      tauri_plugin_deep_link::register("wraith", move |request| {
    dbg!(&request);

    if let Ok(url) = Url::parse(&request) {
        let search_params = url.query_pairs().collect::<Vec<_>>();

        let params: Vec<_> = search_params
            .iter()
            .map(|(key, value)| {
                json!({
                    "key": key.to_string(),
                    "value": value.to_string()
                })
            })
            .collect();

        handle.emit_all("scheme-request-received", Some(params)).unwrap();
    }

    handle.emit_all("scheme-request-received", request).unwrap();
    
})
        .unwrap(/* If listening to the scheme is optional for your app, you don't want to unwrap here. */);
        Ok(())
        }).plugin(tauri_plugin_store::Builder::default().build()).invoke_handler(tauri::generate_handler![
            close_splashscreen,
            set_window_shadow
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
