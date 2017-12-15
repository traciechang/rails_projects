class User < ApplicationRecord
    attr_reader :password
    after_initialize :ensure_session_token
    
    validates :name, :password_digest, :session_token, presence: true
    validates :name, :session_token, uniqueness: true
    validates :password, length: { minimum: 4, allow_nil: true }

    has_many(
        :subs,
        class_name: "Sub",
        foreign_key: :moderator_id,
        primary_key: :id,
        inverse_of: :moderator
    )

    has_many :posts, inverse_of: :author
    has_many :comments, inverse_of: :user

    def self.find_by_credentials(name, password)
        user = User.find_by(name: name)
        return user if user && user.is_password?(password)
    end

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end
end
