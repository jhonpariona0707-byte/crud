class CreateAlumnos < ActiveRecord::Migration[8.1]
  def change
    create_table :alumnos do |t|
      t.string :nombre
      t.string :apellido
      t.integer :edad
      t.string :correo

      t.timestamps
    end
  end
end
