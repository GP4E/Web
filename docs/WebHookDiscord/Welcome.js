{
    "content": "Ciao questo è il nostro nuovo [Pannello di controllo](https://gp4e.github.io/Web/home.html)",
    "embeds": [
      {
        "title": "Come si usa?",
        "description": "Prima di tutto vai nella sezione [LOGIN](https://gp4e.github.io/Web/login.html) e effettua il login.\nGli spazi richiesti sono:\nUsername\nEmail\nGithub Token",
        "color": 5814783,
        "fields": [
          {
            "name": "Username",
            "value": "L'username è semplicemente il tuo nickname. Scrivi come vuoi essere soprannominato."
          },
          {
            "name": "Email",
            "value": "La tua gmail. Essa deve finire con @gmail.com. \nÉ necessaria per poter usare le applicazioni di Google come [Docs](https://docs.google.com/document/) e [Sheet](https://docs.google.com/spreadsheets/)"
          },
          {
            "name": "Github Token",
            "value": "Il più utile di tutti. Esso permette di gestire autonomamente il tuo account Github.\nCome crearlo? Clicca [QUI](https://github.com/settings/tokens)\nClicca su _Generate new token_\nIn _Note_ scrivi il nome che vuoi dare (Es. GP4E - Web)\nPoi _Expiration_ -> _No Expiration_\nPoi seleziona tutti gli _scopes_ in _Select scopes_"
          }
        ],
        "thumbnail": {
          "url": "https://www.corsinvest.it/wp-content/uploads/2019/10/github-logo.png"
        }
      },
      {
        "title": "Discord bot",
        "description": "Discohook has a complementary bot, while it's not strictly required to send messages it may be helpful to have it.\n\nBelow is a small but incomplete overview of what the bot can do for you.",
        "color": 5814783,
        "fields": [
          {
            "name": "Mentioning users, roles, channels, and using emojis",
            "value": "These things have [manual ways](https://discord.dev/reference#message-formatting), however they're easy to mess up for someone that doesn't know what they're doing.\nIf you don't understand the above link, using Discohook's bot for this is recommended.\n\nThe relevant commands in the bot are `user`, `role`, `channel`, and `emoji`. Each of those will return formatting which you can copy into the editor to get the appropriate output.\n\nTo use Discord's default emojis, use its short name wrapped in colons. As an example, \"\\:eyes:\" will make the eyes emoji."
          },
          {
            "name": "Creating reaction roles",
            "value": "You can create reaction roles with the bot using the `reactionrole` command, the set-up process is very simple: add a reaction to any existing message in your server, and name the role.\n\nNote that while other bots may allow you to configure reaction roles, Discohook's are the only ones we can give support for."
          },
          {
            "name": "Recover Discohook messages from your server",
            "value": "The bot is capable of turning most message links sent inside your server into Discohook links. Use the `restore` command with a message link to move that message from Discord into Discohook."
          }
        ]
      }
    ],
    "attachments": []
  }