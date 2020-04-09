## Contributing

First off, thank you for considering contributing to COVID19-today.

### Where do I go from here?

If you've noticed a bug or have a feature request, [make one](https://github.com/abhijeetmane/COVID19-today/issues/new/choose)! It's
generally best if you get confirmation of your bug or approval for your feature
request this way before starting to code.

### Fork & create a branch

If this is something you think you can fix, then [fork COVID19-today] and create
a branch with a descriptive name.

A good branch name would be (where issue/feature #123 is the ticket you're working on):

```sh
git checkout -b 123-add-translations
```

### Implement your fix or feature

At this point, you're ready to make your changes! :smile_cat:

### View your changes in a browser

Make sure to take a look at your changes in a browser.

To boot up a this app:

```sh
npm run serve
```

### Add a changelog entry

If your PR includes user-observable changes, you'll be asked to add a changelog
entry following the existing changelog format.

The changelog format is the following:

* One line per PR describing your fix or enhancement.
* Entries end with a dot, followed by "[#pr-number] by [@github-username]".
* Entries are added under the "Unreleased" section at the top of the file, under
  the "Bug Fixes" or "Enhancements" subsection.
* References to github usernames and pull requests use [shortcut reference
  links].
* Your github username reference definition is included in the correct
  alphabetical position at the bottom of the file.

### Make a Pull Request

At this point, you should switch back to your master branch and make sure it's
up to date with COVID19-today's master branch:

```sh
git remote add upstream git@github.com:COVID19-today/COVID19-today.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```sh
git checkout 325-add-japanese-translations
git rebase master
git push --set-upstream origin 325-add-japanese-translations
```

Finally, go to GitHub and [make a Pull Request][] :D

### Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code
has changed, and that you need to update your branch so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good][git rebasing]
[resources][interactive rebase] but here's the suggested workflow:

```sh
git checkout 325-add-japanese-translations
git pull --rebase upstream master
git push --force-with-lease 325-add-japanese-translations
```

### Merging a PR (maintainers only)

A PR can only be merged into master by a maintainer if:

* It has been approved by at least two maintainers. If it was a maintainer who
  opened the PR, only one extra approval is needed.
* It has no requested changes.
* It is up to date with current master.

Any maintainer is allowed to merge a PR if all of these conditions are
met.
