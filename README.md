PublicLab.Editor
====

**This library is incomplete -- this page is a very rough planning document.**

Please contact [plots-dev@googlegroups.com](mailto:plots-dev@googlegroups.com) to get involved! We'd love to make this editor compatible with other platforms.

PublicLab.Editor is a general purpose, JavaScript/Bootstrap UI framework for rich text posting, which provides an author-friendly, minimal, mobile/desktop (fluid) interface for creating blog-like content, designed for [PublicLab.org](https://publiclab.org) (itself an [open source project](https://github.com/publiclab/plots2)).

PublicLab.Editor will provide author-friendly interfaces for:

* titling
* main image uploading
* body editing using [Woofmark](https://bevacqua.github.io/woofmark/) (markdown/WYSIWYG)
* tagging
* edit history

We may include an extensible API for adding custom content modules, for example:

* coauthoring: "add co-authors"
* "post a response" buttons
* event data (calendar selector, RSVP)
* related content selection: "this work is a response to post X"
* geotagging: "Use the map to show where this happened"
* data embedding: "Paste data here and choose a chart style" (via Chart.js?)

Some, or many of the above may be optionally based on [Public Lab Powertags](https://publiclab.org/wiki/power-tags). We may also include:

* client-side validation


## Design process

Early design discussion is [happening on PublicLab.org](https://publiclab.org/tag/rich-editor).

You can try a very early, rough prototype here: 

https://publiclab.github.io/PublicLab.Editor/examples/

![Screenshot](https://i.publiclab.org/system/images/photos/000/015/865/original/Public_Lab_Rich_Editor_design_%281%29.png)


## Setup

To use PublicLab.Editor, you'll need to follow [the template provided here](https://publiclab.github.io/PublicLab.Editor/examples/), and use the following constructor:

````js
var editor = PublicLab.Editor({
  publishUrl:      "/notes",            // content will POST to this URL upon clicking "Publish"
  updateUrl:       "/notes",            // content will UPDATE to this URL upon clicking "Save"
  relatedTagsUrl:  "/notes",            // content will UPDATE to this URL upon clicking "Save"
  newPost:         true,                // is it a new post, or are you editing an existing post?
  title:           "Your post title",
  body:            "Your post content",
  tags:            "nice,cool"
  // maybe more?
});
````


## Developers

Help improve Public Lab software!

To report bugs and request features, please use the GitHub issue tracker provided at https://github.com/publiclab/PublicLab.Editor/issues 

To install PublicLab.Editor for development, you'll need [NodeJS](https://nodejs.org), then run `npm install` from the root directory.

Make changes to the files in the `/src/` directory, then run `grunt build` to compile into `/dist/PublicLab.Editor.js`. This will use `grunt-browserify` to concatenate and include any node modules named in `require()` statements. You'll then be able to try it out in `/examples/index.html`. Run `grunt` and leave it running to build as you go.

For additional support, join the Public Lab website and mailing list at http://publiclab.org/lists or for urgent requests, email web@publiclab.org

* Join the 'plots-dev@googlegroups.com' discussion list to get involved
* Look for open issues at https://github.com/publiclab/PublicLab.Editor/issues
* We're specifically asking for help with issues labelled with [help-wanted](https://github.com/publiclab/PublicLab.Editor/labels/help-wanted) tag
* Find lots of info on contributing at http://publiclab.org/wiki/developers
* Review specific contributor guidelines at http://publiclab.org/wiki/contributing-to-public-lab-software
* Some devs hang out in http://publiclab.org/chat (irc webchat)

****


### Integration with PublicLab.org

The API we'll be working from will include several server URLs:

* publishing by `POST` (`CREATE`?) to `/notes` (will go to plots2's `notes_controller.rb#create`)
* updating by `UPDATE` to `/notes` (will go to plots2's `notes_controller.rb#update`)
* uploading images by `POST` to `/images` (will go to plots2's `images_controller.rb#create`)

The tagging module may make `GET` requests to:

* fetching recent tags from `/tags/recent.json`
* fetching relevant tags from `/tags/related.json` with whatever relevant content to base "relatedness" on
* fetching relevant authors from `/authors/<foo>.json` with `<foo>` being the typeahead stub, like `@jyw` for `@jywarren`


