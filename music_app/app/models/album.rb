class Album < ApplicationRecord
    validates :title, :year, :band_id, presence: true
    validates :live, inclusion: { in: [true, false]}
    validates :title, uniqueness: { scope: :band_id }
    validates :year, numericality: { minimum: 1900, maximum: 3000 }

    belongs_to(
        :band,
        class_name: 'Band',
        foreign_key: :band_id,
        primary_key: :id
    )

    has_many(
        :tracks,
        class_name: "Track",
        foreign_key: :album_id,
        primary_key: :id,
        dependent: :destroy
    )
end