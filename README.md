# User Feedback
Contributors:      wearerequired, swissspidy, karinchristen, neverything  
Tags:              users, feedback, email, media, support  
Requires at least: 4.0  
Tested up to:      4.8  
Requires PHP:      5.4  
Stable tag:        1.1.1  
License:           GPLv2 or later  
License URI:       http://www.gnu.org/licenses/gpl-2.0.html  

Allow users to submit feedback and bug reports anywhere on the site using an interactive feedback button.

## Description

With this plugin, logged-in users can send feedback using a dedicated feedback button on the front-end. For example, when you find a bug you can highlight the relevant part of the page and write some additional notes to it.

This information is sent via email to the blog administrator, including a screenshot of your annotated page and helpful debugging data.

**Demo:** [Watch video](https://cloudup.com/iUtCz3UGF7e)

The plugin is highly flexible, you can adjust almost anything via filters & hooks. We also plan to release a couple of extensions for various use cases:

* Stylish HTML emails
* GitHub and HelpScout integration
* An admin dashboard to store all sent feedback in the back-end.
* Detailed usage analytics

## Installation

### Manual Installation

1. Upload the entire `/user-feedback` directory to the `/wp-content/plugins/` directory.
2. Activate User Feedback through the 'Plugins' menu in WordPress.
3. Visit the front-end to submit feedback
4. Watch your inbox

## Frequently Asked Questions

### How can I enable the plugin for guests too?

You can configure where the User Feedback tool should be loaded in 'Settings' -> 'General'. It’s possible to show it for guests and also inside the WordPress admin.

### How can I leverage this tool in my own plugin?
If you’re a developer, you may want to support User Feedback in your own plugin. For example, if you have a custom settings page and want to load the plugin there, just add the following snippet on that screen:

    do_action( 'user_feedback_init', array(
        'name'      => 'My Awesome Plugin',
        'data'      => array(), /* some additional debug data */
        'recipient' => 'support@example.com', /* your email address */  
    ) );

This snippet registers your plugin properly so the User Feedback plugin gets loaded on that screen. If the user now submits some feedback, the email gets sent to you, including the debug data you provide. How awesome is that!

### How can I change the wording inside the tool?

This is possible by leveraging the `user_feedback_script_data` filter. For example, you can change the message after submitting the feedback like this:

    /**
     * Modify the script data passed to the user feedback tool.
     *
     * This example function changes the message shown after submitting feedback.
     *
     * @param array $data User Feedback script data.
     *
     * @return array
     */
    function custom_user_feedback_script_data( $data ) {  
        $data['templates']['wizardStep5']['intro2'] = '&ndash; awesome company';  

        return $data;
    }

    add_filter( 'user_feedback_script_data', 'custom_user_feedback_script_data' );

### What else can I do with this plugin?

You can dig into the source code and the wiki [on GitHub](https://github.com/wearerequired/user-feedback) if you’re interested in that.

## Screenshots

1. The unobtrusive feedback button added by the plugin.
2. Users can highlight specific areas and leave a message.
3. This is how the email sent to the blog admin looks like.
4. The settings section under 'Settings' -> 'General'.

## Contribute

Here is how you can contribute:

We develop everything [on GitHub](https://github.com/wearerequired/user-feedback). There you can submit bug reports and pull requests.

## Changelog

### 1.1.1
* Fixed: Don’t print templates when the plugin should not be loaded.
* Fixed: Load JavaScript files correctly. Ensures compatibility with WordPress 4.4.
* New: Modernized setup to pave the way for future versions.

### 1.1.0
* New: Configure where the User Feedback tool should be loaded under 'Settings' -> 'General'

### 1.0.0
* First release

## Upgrade Notice

### 1.1.1
100% compatible with WordPress 4.4, this version fixes some bugs related to loading the JavaScript.

### 1.1.0
100% compatible with WordPress 4.3, this version adds a settings section for the User Feedback tool.

### 1.0.0
First release
