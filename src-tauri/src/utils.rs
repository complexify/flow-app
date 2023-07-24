use serde_json::json;
use tauri::Manager;
use url::Url;

pub fn register_deeplink(handle: tauri::AppHandle) {
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
    .unwrap();
}
