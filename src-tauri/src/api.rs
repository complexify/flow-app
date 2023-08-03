
use reqwest::header::{ACCEPT, AUTHORIZATION, HeaderMap, HeaderValue, USER_AGENT};
use serde::Serialize;

use crate::models::{APIResult, URL};

fn construct_headers(token: Option<&str>) -> HeaderMap {
    let mut headers = HeaderMap::new();
    headers.insert(
        ACCEPT,
        HeaderValue::from_static("application/json"),
    );
    headers.insert(USER_AGENT, HeaderValue::from_static("Flow App"));
    if let Some(token) = token {
        let token = format!("Bearer {token}");
        let header_value = HeaderValue::from_str(token.as_str())
            .expect("Could not generate header from value");
        headers.insert(AUTHORIZATION, header_value);
    }
    headers
}

pub async fn make_get_request(url: URL, token: Option<&str>) -> APIResult<String> {
    let url = url.value();
    let client = reqwest::Client::new();
    let response = client.get(url).headers(construct_headers(token)).send().await?;
    let response_body = response.text().await?;
    Ok(response_body)
}

pub async fn make_post_request<T: Serialize>(url: URL, token: Option<&str>, data: T)
                                       -> APIResult<String> {
    let url = url.value();
    let client = reqwest::Client::new();
    let response = client.post(url)
        .json(&data)
        .headers(construct_headers(token))
        .send().await?;
    let response_body = response.text().await?;
    Ok(response_body)
}


pub async fn make_put_request<T: Serialize>(url: URL, token: Option<&str>, data: T)
                                       -> APIResult<String> {
    let url = url.value();
    let client = reqwest::Client::new();
    let response = client.put(url)
        .json(&data)
        .headers(construct_headers(token))
        .send().await?;
    let response_body = response.text().await?;
    Ok(response_body)
}
