use crate::models::{APIResult, URL, Expense};
use crate::api::make_get_request;

#[tauri::command]
pub async fn get_user_expenses(url: String, token: Option<&str>) -> APIResult<Vec<Expense>> {
    let response = make_get_request(URL::WithoutBaseUrl(url), token).await?;
    let response: Vec<Expense> = serde_json::from_str(&response).unwrap();
    Ok(response)
}
