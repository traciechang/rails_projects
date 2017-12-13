require 'rails_helper'

describe User do
  subject(:user) do
    FactoryGirl.build(:user,
      email: "jon@fake.com",
      password: "good")
  end

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
  
  describe "#is_password?" do
    it "verifies that a password is correct" do
      expect(user.is_password?("good")).to be true
    end

    it "verifes that a password is incorrect" do
      expect(user.is_password?("not_good")).to be false
    end
  end

  describe "#reset_session_token" do
    it "generates new session token for the user" do
      old = user.session_token
      expect(user.reset_session_token!).to_not eq(old)
    end
  end

  describe "::find_by_credentials" do
    before { user.save! }

    it "finds a user by email and password" do
      expect(User.find_by_credentials("jon@fake.com", "good")).to eq(user)
    end

    it "returns nil if no match is found" do
      expect(User.find_by_credentials("jon@jon.com", "good")).to eq(nil)
    end
  end
end
