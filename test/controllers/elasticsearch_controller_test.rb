require 'test_helper'

class ElasticsearchControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'should be able to call elastic_search' do
    get '/elasticsearch'
    assert_response :success
  end

  test 'should be able to call duplicate_questions' do
    get '/elasticsearch/duplicate_questions'
    assert_response :success
  end

  test 'should be able to call suggestions' do
    get '/elasticsearch/suggestions'
    assert_response :success
  end

  test 'should be able to call search when ES is not running' do
    FakeWeb.register_uri(:any, %r{http://example\.com:9200/}, status: ['404', 'Not Found'])
    get '/elasticsearch'
    # reset so other tests do not fail
    FakeWeb.register_uri(:any, %r{http://example\.com:9200/}, body: '{}')
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal 'simple_search', json['_source']
  end
end
