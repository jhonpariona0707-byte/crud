require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:one)
  end

  test "should get index" do
    get posts_url
    assert_response :success
  end

  test "API should return posts as JSON" do
    get api_v1_posts_url

    assert_response :success
    assert_equal "application/json", response.media_type
    assert_kind_of Array, response.parsed_body
    assert response.parsed_body.any? { |post| post["id"] == @post.id }
  end

  test "API should create a post and return JSON" do
    attributes = { title: "Nuevo post", content: "Contenido del post" }

    assert_difference("Post.count") do
      post api_v1_posts_url, params: { post: attributes }, as: :json
    end

    assert_response :created
    assert_equal "Nuevo post", response.parsed_body["title"]
  end

  test "should get new" do
    get new_post_url
    assert_response :success
  end

  test "should create post" do
    assert_difference("Post.count") do
      post posts_url, params: { post: { content: @post.content, title: @post.title } }
    end

    assert_redirected_to post_url(Post.last)
  end

  test "should show post" do
    get post_url(@post)
    assert_response :success
  end

  test "should get edit" do
    get edit_post_url(@post)
    assert_response :success
  end

  test "should update post" do
    patch post_url(@post), params: { post: { content: @post.content, title: @post.title } }
    assert_redirected_to post_url(@post)
  end

  test "should destroy post" do
    assert_difference("Post.count", -1) do
      delete post_url(@post)
    end

    assert_redirected_to posts_url
  end
end
