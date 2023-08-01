#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod utils;
mod commands;
mod discord;
mod api;
mod error;
mod models;
fn main() {
    tauri_plugin_deep_link::prepare("com.complexsolutions.flow");

    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            utils::register_deeplink(handle);
            Ok(())
        }).on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                std::process::exit(0x0);
            }
            _ => {}
    })  
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            commands::close_splashscreen,
            commands::open_client,
            commands::set_window_shadow,
            commands::close_client,
            commands::exit_app,
            discord::get_user
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
