if codes && !codes.empty?
  json.url 'https://sdp-v.services.cdc.gov/fhir/questionnaire-item-meta'
  json.valueMeta do
    json.tag do
      json.array! codes do |code|
        json.code code.value
        json.display code.display_name if code.display_name
        if code.code_system
          json.system 'urn:oid:' + code.code_system
        end
      end
    end
  end
end
