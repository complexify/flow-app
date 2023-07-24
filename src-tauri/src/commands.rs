
use settimeout::set_timeout;
use std::time::Duration;
use tauri::Manager;
use window_shadows::set_shadow;

#[tauri::command]
pub async fn close_splashscreen(window: tauri::Window, screen: String) {
    if let Some(splash) = window.get_window("splashscreen") {
        set_timeout(Duration::from_millis(100)).await;
        splash.close().unwrap();
    }
    set_timeout(Duration::from_millis(500)).await;
    window.get_window(&screen).unwrap().show().unwrap();
}

#[tauri::command]
pub async fn set_window_shadow(window: tauri::Window) {
    #[cfg(any(windows, target_os = "windows"))]
    set_shadow(&window, true).unwrap();
}

#[tauri::command]
pub async fn open_client(window: tauri::Window) {
    if let Some(preload) = window.get_window("preload") {
        set_timeout(Duration::from_millis(100)).await;
        preload.hide().unwrap();
    }
    set_timeout(Duration::from_millis(500)).await;
    window.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
pub async fn close_client(window: tauri::Window) {
    if let Some(main) = window.get_window("main") {
        set_timeout(Duration::from_millis(100)).await;
        main.hide().unwrap();
    }
    set_timeout(Duration::from_millis(500)).await;
    window.get_window("preload").unwrap().show().unwrap();
}

#[tauri::command]
pub async fn exit_app() {
  std::process::exit(0x0);
}
