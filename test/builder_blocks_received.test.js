// Validate status 2xx 
pm.test("[GET]::/relay/v1/data/bidtraces/builder_blocks_received - Status code is 2xx", function () {
   pm.response.to.be.success;
});

// Validate if response header has matching content-type
pm.test("[GET]::/relay/v1/data/bidtraces/builder_blocks_received - Content-Type is application/json", function () {
   pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Validate if response has JSON Body 
pm.test("[GET]::/relay/v1/data/bidtraces/builder_blocks_received - Response has JSON Body", function () {
    pm.response.to.have.jsonBody();
});

// Response Validation
const schema = {"type":"array","items":{"allOf":[{"allOf":[{"type":"object","properties":{"slot":{"type":"string","example":"1"},"parent_hash":{"type":"string","format":"hex","example":"0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2","pattern":"^0x[a-fA-F0-9]{64}$"},"block_hash":{"type":"string","format":"hex","example":"0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2","pattern":"^0x[a-fA-F0-9]{64}$"},"builder_pubkey":{"type":"string","format":"hex","pattern":"^0x[a-fA-F0-9]{96}$","description":"The validator's BLS public key, uniquely identifying them. _48-bytes, hex encoded with 0x prefix, case insensitive._","example":"0x93247f2209abcacf57b75a51dafae777f9dd38bc7053d1af526f220a7489a6d3a2753e5f3e8b1cfe39b56f43611df74a"},"proposer_pubkey":{"type":"string","format":"hex","pattern":"^0x[a-fA-F0-9]{96}$","description":"The validator's BLS public key, uniquely identifying them. _48-bytes, hex encoded with 0x prefix, case insensitive._","example":"0x93247f2209abcacf57b75a51dafae777f9dd38bc7053d1af526f220a7489a6d3a2753e5f3e8b1cfe39b56f43611df74a"},"proposer_fee_recipient":{"type":"string","format":"hex","description":"An address on the execution (Ethereum 1) network.","example":"0xabcf8e0d4e9587369b2301d0790347320302cc09","pattern":"^0x[a-fA-F0-9]{40}$"},"gas_limit":{"type":"string","example":"1"},"gas_used":{"type":"string","example":"1"},"value":{"type":"string","example":"1"}}},{"type":"object","properties":{"block_number":{"type":"string","example":"1"},"num_tx":{"type":"string","example":"1"}}}]},{"type":"object","properties":{"timestamp":{"type":"string","example":"1"},"timestamp_ms":{"type":"string","example":"1"}}}]}}

// Validate if response matches JSON schema 
pm.test("[GET]::/relay/v1/data/bidtraces/builder_blocks_received - Schema is valid", function() {
    pm.response.to.have.jsonSchema(schema,{unknownFormats: ["int32", "int64", "float", "double"]});
});
