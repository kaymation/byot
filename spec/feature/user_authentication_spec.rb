require "rails_helper"

feature "user has all basic authorization functionality", js: true do

  before(:all) do
    User.delete_all
    Capybara.current_driver = :selenium
    @email = "seenoevil@nelsonandmurdock.com"
    @new_user_email = "alwayshealin@xavierschool.edu"
    @password = "password"
    @user = User.create(email: @email, password: @password, password_confirmation: @password)
  end

  scenario "user logs in" do
    visit root_path
    fill_in 'Email', with: @email
    fill_in 'Password', with: @password
    click_button "Log in"
    expect(page).to_not have_content("Woaaa there")
  end

  scenario "user logs out" do
    visit root_path
    fill_in 'Email', with: @email
    fill_in 'Password', with: @password
    click_button "Log in"
    sleep(1)
    click_link "Sign Out"
    sleep(1)
    page.driver.browser.switch_to.alert.accept
    expect(page).to have_content("Woaaa there")
  end

  scenario "user creates account" do
    visit root_path

    click_link "Sign Up"
    sleep(2)
    fill_in 'Email', with: @new_user_email
    fill_in 'Password', with: @password
    fill_in 'Password confirmation', with: @password

    click_button "Sign up"

    expect(page).to_not have_content("Already have an")

  end
end
