class CreateQuestions < ActiveRecord::Migration[8.1]
  def change
    create_table :questions do |t|
      t.references :category, null: false, foreign_key: true
      t.text :content
      t.string :question_type
      t.string :difficulty
      t.text :explanation
      t.boolean :active

      t.timestamps
    end
  end
end
