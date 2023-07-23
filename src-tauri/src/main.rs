#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde_json::json;
use settimeout::set_timeout;
use std::time::Duration;
use tauri::{Manager, WindowEvent};
use url::Url;
use window_shadows::set_shadow;

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    // Close splashscreen
    if let Some(splash) = window.get_window("splashscreen") {
        set_timeout(Duration::from_millis(100)).await;
        splash.close().unwrap();
    }

    // Show main window
    set_timeout(Duration::from_millis(500)).await;
    window.get_window("preload").unwrap().show().unwrap();
}

#[tauri::command]
async fn set_window_shadow(window: tauri::Window) {
    #[cfg(any(windows, target_os = "windows"))]
    set_shadow(&window, true).unwrap();
}

#[tauri::command]
async fn open_client(window: tauri::Window) {
    if let Some(preload) = window.get_window("preload") {
        set_timeout(Duration::from_millis(100)).await;
        preload.hide().unwrap();
    }

    // Show main window
    set_timeout(Duration::from_millis(500)).await;
    window.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
async fn close_client(window: tauri::Window) {
    if let Some(main) = window.get_window("main") {
        set_timeout(Duration::from_millis(100)).await;
        main.hide().unwrap();
    }
    set_timeout(Duration::from_millis(500)).await;
    window.get_window("preload").unwrap().show().unwrap();
}

#[tauri::command]
async fn exit_app() {
  std::process::exit(0x0);
}

fn register_deeplink(handle: tauri::AppHandle) {
    tauri_plugin_deep_link::register("flow", move |request| {
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
}

fn main() {
    tauri_plugin_deep_link::prepare("com.complexsolutions.flow");

    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            register_deeplink(handle);
            Ok(())
        }).on_window_event(move |event| match event.event() {
      WindowEvent::Destroyed => {
        println!("Closing Process");
        std::process::exit(0x0);
      }
      _ => {}
    })  
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            close_splashscreen,
            open_client,
            set_window_shadow,
            close_client,
            exit_app
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
