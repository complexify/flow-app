use tauri::Manager;

pub fn register_deeplink(handle: tauri::AppHandle) {
    tauri_plugin_deep_link::register("flow", move |request| {
        handle.emit_all("scheme-request", request).unwrap();
    })
    .unwrap();
}
