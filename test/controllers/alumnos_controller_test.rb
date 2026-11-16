require "test_helper"

class AlumnosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @alumno = alumnos(:one)
  end

  test "should get index" do
    get alumnos_url
    assert_response :success
  end

  test "API should return alumnos as JSON" do
    get api_v1_alumnos_url

    assert_response :success
    assert_equal "application/json", response.media_type
    assert_kind_of Array, response.parsed_body
    assert response.parsed_body.any? { |alumno| alumno["id"] == @alumno.id }
  end

  test "API should create an alumno and return JSON" do
    attributes = { nombre: "Ana", apellido: "Pérez", edad: 20, correo: "ana@example.com" }

    assert_difference("Alumno.count") do
      post api_v1_alumnos_url, params: { alumno: attributes }, as: :json
    end

    assert_response :created
    assert_equal "Ana", response.parsed_body["nombre"]
  end

  test "should get new" do
    get new_alumno_url
    assert_response :success
  end

  test "should create alumno" do
    assert_difference("Alumno.count") do
      post alumnos_url, params: { alumno: { apellido: @alumno.apellido, correo: @alumno.correo, edad: @alumno.edad, nombre: @alumno.nombre } }
    end

    assert_redirected_to alumno_url(Alumno.last)
  end

  test "should show alumno" do
    get alumno_url(@alumno)
    assert_response :success
  end

  test "should get edit" do
    get edit_alumno_url(@alumno)
    assert_response :success
  end

  test "should update alumno" do
    patch alumno_url(@alumno), params: { alumno: { apellido: @alumno.apellido, correo: @alumno.correo, edad: @alumno.edad, nombre: @alumno.nombre } }
    assert_redirected_to alumno_url(@alumno)
  end

  test "should destroy alumno" do
    assert_difference("Alumno.count", -1) do
      delete alumno_url(@alumno)
    end

    assert_redirected_to alumnos_url
  end
end
