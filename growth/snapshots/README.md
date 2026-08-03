# Snapshot Contract

Snapshots are small, normalized, aggregate observations organized by date.
They are not raw dashboard exports and must not contain PII or credentials.

Every snapshot should include:

- schema version;
- observation timestamp and timezone;
- source name;
- source freshness or report window;
- metric values with explicit `null` for unavailable values;
- collection method;
- caveats.

