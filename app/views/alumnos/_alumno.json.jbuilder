json.extract! alumno, :id, :nombre, :apellido, :edad, :correo, :created_at, :updated_at
json.url alumno_url(alumno, format: :json)
