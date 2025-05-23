use crate::models::{APIResult, URL, User};
use crate::api::make_get_request;

#[tauri::command]
pub async fn get_user(token: &str) -> APIResult<User> {
    let response = make_get_request(URL::WithBaseUrl("users/@me"), Some(token)).await?;
    let response: User = serde_json::from_str(&response).unwrap();
    Ok(response)
}
