use serde::{Serializer, Deserializer, Deserialize};
use chrono::{DateTime, Utc};

pub fn serialize_optional_datetime_utc<S>(datetime: &Option<DateTime<Utc>>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    match datetime {
        Some(dt) => serializer.serialize_some(dt),
        None => serializer.serialize_none(),
    }
}

pub fn deserialize_optional_datetime_utc<'de, D>(deserializer: D) -> Result<Option<DateTime<Utc>>, D::Error>
where
    D: Deserializer<'de>,
{
    Option::<DateTime<Utc>>::deserialize(deserializer)
}
