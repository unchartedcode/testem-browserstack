# testem-browserstack
[Testem](https://github.com/testem/testem) Integration with BrowserStack.

![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)

## Setup
* Clone the repo
* Install dependencies `npm install`
* Update `testem.json` file with your [BrowserStack Username and Access Key](https://www.browserstack.com/accounts/settings)

## Running yourtests
* To run a single test, run `npm run single`
* To run parallel tests, run `npm run parallel`

## Notes
* You can view your test results on the [BrowserStack automate dashboard](https://www.browserstack.com/automate)
* To test on a different set of browsers, check out our [platform configurator](https://www.browserstack.com/automate/node#setting-os-and-browser)
* You can export the environment variables for the Username and Access Key of your BrowserStack account
  
  ```
  export BROWSERSTACK_USERNAME=<browserstack-username> &&
  export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```
  
## Additional Resources
* [Customizing your tests on BrowserStack](https://www.browserstack.com/automate/capabilities)
* [Browsers & mobile devices for JavaScript testing on BrowserStack](https://www.browserstack.com/list-of-browsers-and-platforms?product=js_testing)
* [Using REST API to access information about your tests via the command-line interface](https://www.browserstack.com/automate/rest-api)
 
