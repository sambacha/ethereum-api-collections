// Validate status 2xx 
pm.test("[GET]::/relay/v1/data/validator_registration - Status code is 2xx", function () {
   pm.response.to.be.success;
});

// Validate if response header has matching content-type
pm.test("[GET]::/relay/v1/data/validator_registration - Content-Type is application/json", function () {
   pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Validate if response has JSON Body 
pm.test("[GET]::/relay/v1/data/validator_registration - Response has JSON Body", function () {
    pm.response.to.have.jsonBody();
});

// Response Validation
const schema = {"type":"object","description":"The `SignedValidatorRegistration` object from the Builder API specification.","properties":{"message":{"type":"object","description":"The `ValidatorRegistration` object from the Builder API specification.","properties":{"fee_recipient":{"description":"Address to receive fees from the block.","type":"string","format":"hex","example":"0xabcf8e0d4e9587369b2301d0790347320302cc09","pattern":"^0x[a-fA-F0-9]{40}$"},"gas_limit":{"description":"Preferred gas limit of validator.","type":"string","example":"1"},"timestamp":{"description":"Unix timestamp of registration.","type":"string","example":"1"},"pubkey":{"description":"BLS public key of validator.","type":"string","format":"hex","pattern":"^0x[a-fA-F0-9]{96}$","example":"0x93247f2209abcacf57b75a51dafae777f9dd38bc7053d1af526f220a7489a6d3a2753e5f3e8b1cfe39b56f43611df74a"}}},"signature":{"type":"string","format":"hex","pattern":"^0x[a-fA-F0-9]{192}$","example":"0x1b66ac1fb663c9bc59509846d6ec05345bd908eda73e670af888da41af171505cc411d61252fb6cb3fa0017b679f8bb2305b26a285fa2737f175668d0dff91cc1b66ac1fb663c9bc59509846d6ec05345bd908eda73e670af888da41af171505"}}}

// Validate if response matches JSON schema 
pm.test("[GET]::/relay/v1/data/validator_registration - Schema is valid", function() {
    pm.response.to.have.jsonSchema(schema,{unknownFormats: ["int32", "int64", "float", "double"]});
});
