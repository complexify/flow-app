

use crate::error::TauriError;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize, Serializer, Deserializer};
pub type APIResult<T, E = TauriError> = Result<T, E>;

#[derive(Deserialize, Serialize)]
pub struct User {
    id: String,
    username: String,
    discriminator: String,
    global_name: Option<String>,
    avatar: Option<String>,
    bot: Option<bool>,
    system: Option<bool>,
    mfa_enabled: Option<bool>,
    banner: Option<String>,
    accent_color: Option<i32>,
    locale: Option<String>,
    verified: Option<bool>,
    email: Option<String>,
    flags: Option<i32>,
    premium_type: Option<i32>,
    public_flags: Option<i32>,
    avatar_decoration: Option<String>,
}

fn serialize_optional_datetime_utc<S>(datetime: &Option<DateTime<Utc>>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    match datetime {
        Some(dt) => serializer.serialize_some(dt),
        None => serializer.serialize_none(),
    }
}

fn deserialize_optional_datetime_utc<'de, D>(deserializer: D) -> Result<Option<DateTime<Utc>>, D::Error>
where
    D: Deserializer<'de>,
{
    Option::<DateTime<Utc>>::deserialize(deserializer)
}

#[derive(Deserialize, Serialize)]
pub struct Expense {
    id: String,
    name: String,
    e_type: String,
    amount: i32,
    description: Option<String>,
    #[serde(serialize_with = "serialize_optional_datetime_utc", deserialize_with = "deserialize_optional_datetime_utc")]
    created_at: Option<DateTime<Utc>>,
    #[serde(serialize_with = "serialize_optional_datetime_utc", deserialize_with = "deserialize_optional_datetime_utc")]
    updated_at: Option<DateTime<Utc>>,
    // created_at: String,
    // updated_at: String

}

pub enum URL {
    WithBaseUrl(&'static str),
    WithoutBaseUrl(String),
}

impl URL {
    pub fn value(self) -> String {
        match self {
            URL::WithBaseUrl(url) => format!("https://discord.com/api/v10/{url}"),
            URL::WithoutBaseUrl(url) => url
        }
    }
}
