require 'spec_helper'
require 'rails_helper'

feature 'the signup process' do
  scenario 'has a new user page' do
    visit new_user_url
    expect(page).to have_content "Create"
  end
end

  feature 'signing up a user' do
    before(:each) do
        visit new_user_url
        fill_in 'Email', :with => "test@hi.com"
        fill_in "Password", :with => "test"
        fill_in "Cheer Count", :with => 1
        click_on "Create User"
    end

    scenario 'shows username on the homepage after signup'do
        expect(page).to have_content "Welcome"
  end
end

feature 'logging in' do
    before(:each) do
        visit new_user_url
        fill_in 'Email', :with => "test@hi.com"
        fill_in "Password", :with => "test"
        fill_in "Cheer Count", :with => 1
        click_on "Create User"
        click_on "Logout"
        fill_in "Email", :with => "test@hi.com"
        fill_in "Password", :with => 'test'
        click_on "Log In"
    end
    
    scenario 'shows username on the homepage after login' do
        expect(page).to have_content "Welcome"
    end

end

feature 'logging out' do


  scenario 'begins with a logged out state' do 
    visit new_session_url
    expect(page).to have_content "Sign In"
  end

  scenario 'doesn\'t show username on the homepage after logout' do
    visit new_user_url
    fill_in 'Email', :with => "test@hi.com"
    fill_in "Password", :with => "test"
    fill_in "Cheer Count", :with => 1
    click_on "Create User"
    click_on "Logout"
    expect(page).to have_content "Sign In"
  end

end
