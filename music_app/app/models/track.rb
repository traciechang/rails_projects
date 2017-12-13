class Track < ApplicationRecord
    validates :title, :ord, presence: true
    validates :bonus, inclusion: { in: [true, false] }
    validates :ord, uniqueness: { scope: :album_id }

    belongs_to(
        :album,
        class_name: "Album",
        foreign_key: :album_id,
        primary_key: :id,
    )

    has_many :notes,
        dependent: :destroy
end