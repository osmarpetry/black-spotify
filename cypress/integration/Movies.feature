Feature: Movies

    I want to check button App actions

    Scenario: Click on specic movie and check content is right
        Given I go to 'http://localhost:8080'
        When I click on href '429617'
        Then I should see '429617' in the url
        And I should see 'Spider-Man: Far from Home'

    Scenario: Back to movies list from a movie details clicking on first element a (the logo)
        Given I go to 'http://localhost:8080/429617'
        When I click on first element a
        Then I should't see '429617' in the url
