import React, { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';

// ============================================================
// MINUË — Catálogo Interactivo B2B
// Deploy: Vite + Vercel. Mover @import de fonts a index.html.
// ============================================================

// Logo Minuë (silueta alpha, coloreado vía CSS mask-image)
const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATQAAABkCAYAAAAIeMzcAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAkM0lEQVR42u1dabQlVXX+qu59Q080NAjN0N00g4wqGo0DARSNkmCMCpiIigmKCxGzgoCSKEYT1KUM4qyREBE1BqOiRjAxEjTBYQUhiAwBoihoj/T4Xvd7795blR9n79S+59Vw6pxTt+ph7bVq9ev37q2qM33n2/vsIUArrbRSpwTiYokBRL8h7eTL20NaaaWV0S/u0AC4OvTvYAG31aQN/JnIFdxaQGulldEvcLm4lwBYA2AZgdwcgE0AfpkCgIMF3M6Q2rkvgC61cxuAX9DPWd9rpZVWGiih+HkvAK8B8BUADwKY1tSvzQDuBHA1gGenMJmFwD755xcB+DSAuwBs1dq5A8C9AD4H4GUAJkRftWSrlVYaDmYhgPMB/Fxb2DGAPjGTKOX3/wzgWXSPboMXu7SR/T6A76e0MxJt1f92J4BXthpkK600H8wOBvCvYvHO0dWnK6JFPhC/mxMLvw/gL1OAo0lgxoD7UdHOnmhnJK4B/W1W/J2/cz2p4C2otdJKA8HsMAA/E0CWxk7yLsloPizUz6YsdlYzJwB8Vbxzv2Q7B+I7twJY3lDwbqWV3zjhRb4XgLsFmMWWVyS+/w4NMJsC3NfR+81YgJm8Zujfb9C9W5taK600ZJF/ghbnLObbx8pec3SfHpRNLUD9BwX8/D8SYNRzBLS+ALU3a89ppZVWagKzowHsRmIbcwW0gWBpNzWApbE6uAjAfYJFurYzIlAcAFgPYIV4XiuttDJi6dK/70FiGI89XhExmKNrBjVmTacKwPXZTmZ5r9P6tXAnaaWVVvwJO4aeQgsyrOD+EwBOaMg6fiE8hzCR8D2fT/8vDAfrtnOvlVa8q2ExqUkHVqQm8T2PFQu/DuHnHlNRO/kw4ChTQGsZWiutVAM2y5F4vlclKxrS5sUV339Pod4GLaC10sroWcs0qo9J3NmQNvdMwMZBdpuy0BbQWmmlGkDbRFcVKiHf72cNYaPsNBxV0M4YwEN076CoL1tAa6UV/9KhhfcD+r/vhc6ph/6zIe29BdV49Md0z9tEv7bSSis1ABoAnIzEbYN90Vz90NgF5MeoP1Cdn70PgA0Y9kNz8UXj+/RJ3Ty8JWCttNIMdexbtEh3ewI09qB/RUNYCz//7aKdPgBtln6+umVnrbRSv0iXg20ERrOOgMZg9oUGMRYZmP5D+Anz4miI+wHsjTaWs5VWGgNqgPKkn8Fwto2ogMnIv0lV87tIstsGDWvnwVAJKxl8uZ2DAjaWFoC/HsCTW1WzlVaaJawqvQDAo5gfZC7BTQKAzBfGC/7LUP5tTVzk/D6HQB2GSNUxLR+anhdNZui4G8CTWjBrpZVmg9paADdorIQDzvnqYX7s5zokWSeavMj5vSah4lh3Yr5dbE67dJX6Q1COtLLfWmmllYaCGgAcD+AapKfi5msbgB8BuBDA/vS9hZDsUILtEwH8DYCfItt+2Cc19SqhYnJ/lW5ra2hrpZXRL3b2S1tKqtVBBFqTUIVEfg3gAVrocoEvlGpIepWqDlS851qo+NYlUKeh6wjUf4qk8hP72AWoJuC9lVZaqYCthYbA0KRU2zYA3vHcJy1Da6WVhjOZtJCex1P19CBDXQ4wbE9spZVWWmnFhaFJ/5c45V4LaWfpijbEGX3jXJ4+o+9gcF99fFzfRRaBzWpv08cva/7JNgw8jlHROPkeI1+sDxWNcxn/t9hjm/JkMIpObWXhSuv708rjnqGFhOi/A+AIqKIIW6FOK8ahQhSOhvLw/ab4fJPbvS9UtZqHoE6WdkD5AC0HsB+152b6u0t7+LsnATgO6mRnKz1vF4aLzXYAjEGFkiyB8go/ACqZ32ehjvML06hkPP84AL8FdYK2BSpnV0jP2BsqA+p9AL6N5p2qcZtfDOWn9BD1xW7qrz2gTtD2A/AP1LYy/cR9dAKAp0AFW28CMAXlH8XOsDH1zTjUqeRimi8r6R0+D+AxizHy1T8rAZxOc2wTlC/YLjHOy6GCvR+AytZhOq/5/i+FcseYov6YofvvRFJXkx2G9X+5vugg5d4dwf46dHXFv2N0dWldLKY1EdG6mLFRzwDgI0iMeLtoYUyJ362ngW2yzwyfvFyK4QrP2wBsxrDPzJla+12e90kM++D0aCJsoeduosXAC1X32TnEkkHxu1+IYSfGrfQsWXJsN21arm2uasw+L951mvpuB5Lwmmla1GU3bG7r1UiPLZyi/uLxmUZ68ZMja2K5/Lyna+/Da3Sb9r7vLznGfP9vo3yVKga8bfQumwBsRJIzbjP9fiuA7QKEZ1FcYObXSDLmBjYTdh8kIRqL6GLbQY92yDNp8XZpsTSNnUVQPkBnix1kEklYCagzuwBWe7AH8MLaKJ43TvdfWvDdPn1/N10uskPskBMYThHNoSiTAG6ESn3zkwYxNe7D+0QbFovJzGE06xz7ab24f5cWMrODLDtRnz7Hi9On/aisTAlw72hrVM7rRy3NQ+sF2+pmjFMgbHlhTt+VEQlibDfrALhHMNAoLDGZBvTvAWK3lA9hn5MYwPm0WJroCMiOe6+CCqaN6F115Gfau9rjYpwW9w0Ndzn+/JzYHGwXSy/n2SFN0AGpn1+n/hmgGSEogViwHcw/8ue+6tmoH6JPd5UcI6kizRALqRPQmNF0U9ZoLNS4qZLvyf2/W7Q37ZJuKD6vQGCMvKZsjb8xsYkDxHd1/xL2Dj6GdO0YzYrHCgSAnacNVJByAcAaT7sL745Fz9SvWEwkV7Y7W9BWHsMetftGAE+gMa37oEDm6teZhWwD27tsQWU6h3Fk9Rs/Z3sDNBId0LPeeadlH00bfi/wfGXJbjkfwpLovBxJXFmY04gYwJ8JxtY0dvZ7UHFjEYo9sfcTKo2rTFvSfGYOPUcwmDF4fiBMBU8B8CVSQ2M04/RzVwaQSeB3eVcXdrfJYXx9AtqswVq2LbAy5dBGVs/1tEnIYGWlx6DsoO8LdcIQ53QWg9hzADxXgEYThKnrn2v/zxv4PYmZxh4m6i6HybBbMA9b2W34fAlqJwH4nOFuOQqGNlvQhl2OoNJzeMfNNQJanMHQ0ua/C6BNO669rrCtBZq2AgynFuITU85C0sewR0AEdQBZWuXkh602AALZuRfUbE+QwkB7PIATDYCW2/cEAnKXiRo7TgYGo55jH8jFbjImXXrmaQA+LOxpdTKQIsCa8qiWl5WNDWBos2LjyhrjfgnVUV8PLnN4O1Sus4cA/JIYLbst6fZI6a4xjsRloyt+HxImseZlfGTLjVkrUDRvt2bflhdBHSPfjvpPy2KhCgeGdqGYdoA9PU1UG/agq1K2VJ/vEZVk5l1aJG+iCfhu1Ht6XcRSpx3v37PYhOMGAVqRysmfse2nHRb9wxvhrVB+n2zC6AqwWkZrLe1aSmtwmfgc+072oU66p1DCbYMH6AABaEXspk8v+mYAr20AO4ugHGX/sISNhdu50tN7TGsMKTBYKHEKGNra8zgr6HiJ7wT0+QGAdxGofbxGUOsXgMZ2T/dHyT4ClC9V3TInVM48hjZlAUxlzBZZG/qsAeCarulxWse8NmLTnXqgqZwmthQGkdMBHGbBDKpgaOdRJ/QN3kW2b7WHZzOgRRYLxXUiyZ05tlywfIL9UaiKQ33U43hbxPKnPN0/sBinXTXPb97sZgzauMtyDs+UNFvogMZ2tDR/tVBTN+UlXUK4DbtpTcVlbGiBUDEP0uxReRIKOnge/BjVbYTV3wOhHH5jmJ++xp4ATQ7owHIi7fIAaLMOar+cSNcBeN6IQS0W7CKu0IbmYhaZRr0SaKBTxTxwmYc7kF8QRtZT6GsXO/PHyHHpKMOYFgFYlcEesiYgA8dZBCh1sDTeSd4AYC/Y+VSt8mQb2VVSpZEL18di6cHN/UTmjL8BwNOoPaM8xR4UbEa+bGg2QFJkjB/F5p3HFGMB+rbmAmnLtWFovja3VPeOMgt7T6iwJ9OFHQi1c28Ab6yBpQXi+edg2HYWlJio0nbowi7kRDLxtZHvOOM4ASS7cenPLvXDPgC+AnVQNMpogoEhk7WVfgVAMmqZMQClyHIOzWosqSwYjgTRTT6zinZmW4b0OigXiFGyND7OPRvKIbgsO5OuG+NC9XYBlkjcOzCcRIC7D5oPQJP9OkASTbAPRhdNUJRvbGrE4BGL9yrrClGVzBkAiy1D6zl8d2oUC950Ua/GsD2t7ORfScAyKpbG77oHlMuBjfe4BLQ9Paid0mBbxobHO6OrzMLfySTHlz4Zql7k0hGNbZHKudOTecDmvZrC0ExYrC3ozsHe/tYoQDvIQe1ipnQuAUw0ggnHzzyTmEQf9oC2D1SEhA920Sup8poaen2wm7LCjrcnQqX1CVF9NEEWoAWCQbiwJJfA/7oPBaD1Qd7GJrWnsizfFtAaoXIygB3syJb6dI/XoPq4QGZni6D84FwWMTsA2uTYylM5ywAq4M8pOfDcz8zUXgLgb4VJoSpQiwraNVMTiAxKsu+q1fI8mXFsp237Kgd8G0ALLCc+G8HPh7LFVcnSmJ2dBuVM62K05sFb68neYpsCqGonVpfKO2P0fmcDeB8Se1pQ0WKNGwhoEdxD03xJv2Auu/g09sTmauuUWyugsV1kreMOz+rJkQDOqJilRbTI3uKBmcSayu1qQ2sqoOnpisrY+Ng5sg/gEgAXobqTzzSGIN0IZmsCkQh+Dm5cNyWTuWIDaPLeUYV4UymgcYP3wnA5en23jAyfxc+7EElSRd/Cvm+nAngqhlMEyfQlccmB3N/ThBs4LGRXdSaNhfHY/RzAI9RP7K8WGYxpoI1vH8DlAP4EieNt4HnRxjnsYc5DP416bEfF0GQ/1cHkKx8TU0A7EFqajpQFERuCzQAqz9apqCa1EL/PBdruLZmijeF6f0+AEjm2y0W6KWPO9/0JVJzrNiSZa02Znf5zBGVPezGSmF7fLCRrIbsytMdDxTJTQAss52Fs+f3GANpBSPfDCjXmZaK68s8XIbF1+ZpEzM5+F6p6jwRMfs7DKGecDAWoy1TkroAWlJwAPnb/PLa0CMCdULG3nHfexvkyEOrmP0IVXJmDvxCpvEUhA7OruL/pQq9bTJ2PbTO3NLbKuSmgrcpQe+6Hym5g2kgOh4oAPBsqvZBPR1t+h4uQXmY+AvBe2BWyWInhYhOuDLIsW4gqGm8ZthMC+A6AlyMJaYpKTmSOJoih4nhvgCqP5ytEqoihuaqc3RGMa9XSc/z741bl5Bc4XJv8DGxfB3CN2JWLJrq+IzDw+GgoL76TiKFJoOR3uw3KX6rMpJc1PJfWMDljj5MhLTljLNgNH6bcDGUDY0bZLzGfZG3FHqnqX6NN0cdBQZzzO2lDs5VJy+8N0Bzm0i+Yyy59FHkeu1oA7bAMiroRwBWkopSpH8C2tOcBeD782NL42W/D/HxjDKZXE922yZm1DOViWX0Nqm+/sTDj/j2xMMegivW+UbAtG1WbT7YPgQqR2hvuIVJ5DKHvAdACBxBpCqAVgU5vVABTQG70K0y58ipMzbMJh4Yds0YbbP7eVqgK019GucrivPMHAC720LnMzk4kdiajAljVuYOYQoAks6gpQ2NwPNgDyHQs2xt7mkhZ9+1ri7MLZdi/kADO5kCDXXNmoDJz/BOp7TYuO3GKrSpOARXXQ4HQsr+bxNAGhoA2SgADhnO2FaUR0tMJpV3zXEi6Bgt5OZKc+vqkfpg+dzmUMVkaksOCezNLewGpid+FW5rugBYfZ1INNLXzKnHvjRY7XgdJ1g1XXzTfzMsUlPMOBQYaeLB6eBVUHOulmH86FhiAQ0xqXA+qaM7naa7A0twQp7RLqs09RzNGp+T46Iu0CRIWAIuLT6Neqans4VYsNkhmWbJ+wJj4eRJJiu7lUOGHy8j0s4Q0ptuI/YcAIhNAWwVghTZBOeD8Yfr/f0OlkvljJMVsTRYZqzcXE6DFlhNwAHWqya4gXQ2I7qH348/aAtr+jmBU9wlRN2dsogwW3QXwTppEFxDbGkP5AjscIvUyYn6vF8w6tgS0LLUvqAAMFhJDK1p/o06dztrbR6CSPE4iKWzNc3Icw8VQGNBM5EYe867BROTTvb7GwB5DUjABZJ86reTOxhP6FKhqTLeVVF3lLvHWDIYXAPgg1CkeV3P/lSVlXmVoo2iqTOQs2DTfolhsOm8hUDuH1Lpxiz7kgiuvgzppvsQS1LLU6FlPi2+hA1q3YYDG5OgoRzaom0jGAPxYzgOTwVul2S54Aq0TgNYB8CMAN8HMKVMmiGPV5mIH29kzCRTl4QL//ACAL2L4JHad5cDsv8ABbcwA0NJ+z4b8N0AdFkzArj5BQO/Qgzq8eSv8hkj1PC0+F1NCy9DyQV+m09btZLptjTGKDwfkYcEY/W7IBcsE0A7Vdi5+0AZSIeQEuFxM/rhg0gQYzoB6KoBnoNyJJz/jEnGfWHRSAFXUY1p7p0dLTl4ZMWFasamJ0s0Z86hgsbKp4U+h3DrGkeTGMmEn8iSL7ZzvJ7bWx3ABWhtV3heg2TK0Jp1yFjG0OsA31GxmaSeZIXLqBSD9lH6m7OAdkWL3AoD1mg0rJJXx31DOuB8IW82FBnYSnZ39NoA/wPABABvAfwHgesw32u5EchIal5jkK2Hvp9QUhuYapD8LVVvxB8TUbMu+sR32kwBeWnI8sjYcn4Bmc1jRAppZH2XWBLBg0eOmgMZuFWtSVEVAVT5Oe8gVKH8sz3azlwM4zvD73BFvFYsjwLBLyMehYhP1hbIddr5oywHs56ia1CGBGHwXHzDeNHZCGffvQZJkwEb95IX1OaiTbptogrQ05YGHvoLDe9Q9zpMFf2+a/1kW6GVVghogSWO0twmgMTCsEHYjvbjII1rnMEv7DlSF5BDmhlLO8DAGFT1QpNIxO3s67e6RAC1me+uQRDHoAfQ7BKCZhmzFUIcj+y9AQJMMzVXYJLCBQO0RJHbTsllMmEksgfJlfLojqPmwDXVGDIRVyOKGgu82qMPEnUiKDkc5oJdXq3OSfvdUE2rKgLY/MZI4BQQ35uy6H4CKApCdVzTgXcHSjqXdP0t15XteKj7TEWoHO4VuybjHTurcMgySn3HAAlY5Jz1NaO6LB6EyatxCO2VPs3OEBqpdV+y0X4byS3zQ0Gyhl1PzAWhdh++VPaGvSopC9Eb9jjxOryez1LhmV5PANUF/Xwrl/7gMKn3ZHqQhLaNrMRGurXJOdwt2m9W0qw8EakaaDU2f6AGAbwP4PlQAumn6mJAWxCKoE7DX5Oyg7Hf2Ysw/2RwHsAnAJzDfwTIW399SkqHxcxaiyskyIdoTegC1LlTaoZdBHRQshl3l8Q7Nk9UAvgHlgLveACACDUB92NBsGdpYg+ZE0cblI7eeDaBtyMANHxLBYFIflcK+eJLtyOgUZjNXIIkIMFXpWJU8g1haWiYOyc502xjbzv6OOi9vQfzasuNWL0AgCzwzNAhG1AXwHwBe5bBQeMLPQR1C3QjlBW6SiUU+q05A62L0RbSzmNeSgk1ltqb5x5vPGNLjNrNiOLva1cnq66IQiSNTJk1AKtt0TqeGAL4J5fQWGqgCAYYLE08A+IsUW5p0xH0BkhAnyaC2Qx0GFIW/rNPAtOj9Qg3QFqIv2ngFOzOD2tdIpWDTQZnEnzz+XJvgmVC+g5OGbDKqEdACoebVCWhSeyo6FOg5Psc09C1tnEwvPWZTXgNk1CQp8klandIIEGhMZUxYudt+QLPJmXQSZ+04DSqzre6O0QHwDgznwJcnm9dBGaqL1JUNjgwtXoCAtqii+zKoXQflID2G+UHkRf3FPkhdmjvPR+JyU7R4fMQowtGUMIliY/yozArLCtpSV+2DuOr7hTlIvwTzs2ywbEO+2wOD0NcA3IVyqYXY122CFkcsKH1EdrPjhXojDdA7AXwYZsHJv7Ls5JUl2/N4Z2i6Te0KqCSaYxoTKAMUY1AOk6cD+FSB6hmkLNQ63Da6UMZr1+e7yl4otvPufJwAmpHKKYvrrtE+FwuG1s8BDmZps1DZGso2RvqlPVnQ0DFiZ7yAZOGTEMAXAPwvzE6bNolnlUn0uCcW7sHAooonK59+vp2AaBx2IVIMvnOkxn4Awymh4gptaC7MaHnNKiegTgP3zvlMjMQwX0chmZEDmlStJjMmzxaD77MK+CUA9wpbmomvErO0RVBhTXy/M6B8lfg0MxRq6q4S7IxZpk019T0cAM2lqrgP8Fzi8V5ZE5ZtmefS2NuAGtssx2mMLiaQ1MPidBtrXBOQsClkZcX9azI/ViK9Vgdv8NPIPtArOw9NPQT0TNcjBTT+3VFaR8jGbDZsSAiV5eJqzM8eWyR8AHAasTRAnWzq9hie5F8l4AwK2JkE5Z0wz+ck0x3t6zBxQ49jVXZnHIWNJxb99VooJ+sJh8nMqbwvo/ttQPkA+zKyy+I7bLtrgtN1kY33MbgVknHZlGtlaIfn0HtTXxJmaV/AsLOkqYrHTOzNUG4BR2J+JaeQVJMrUS7Z3GMWtgQGSttEj0FNgKYztKqFx303gFcAuBvlSuOl9dkAyh3nXAyfsOtFcFxlymJs9WLUdaqcB2eAB/fNo6KNowS0kcS6hjmDk1cpfXOJRoQ0AT+C8tkt2Ph+FlQQc5RCo0OotEV3GrAzybamSlBvPe5sleWOE1guFF8MLU/l9M0qeOPZBGULfQT2GYlDodZ9CMqOmfbOPhbMDod1dKxHYLUd42Mz+oL//zMxNrEnzGgMUwszbFfdDEALhP2p7G59vZjUZXyTAiShEKGY3NIl4CrLRbm1ZCfz/Q912N3Ckp+PBbi7yiJD24gv4bn0EIHaTpj5Jaa9WxfDJ95pG03sYZFtRPlCLvzZo1FP+BOv2yVQ0Tn62pZ2rAcdx9slxVNtKudysWjTjICbSjYkJBD8mCGLMukMPlH7DpSneojy1b7Xpwy4iax1YGhdi+/oi9iVoeXNBd+TjoPNb4dK0T5nOQd0gK9q59+MJE45KjlGq4TKN0onW37+cVA2tAjZ1b3ucOwrGRHRuFP+rEavhjrN0186tKTlzNKuhTLqdlC+4G6QwXSutOhc/uyGkoMra3SmVZI3+X7HcgH6qDy+pKZ5xocpN0Gl8O7ATy4sZNiJbFXkgADNJqNxn7SIZ8HNcG67jgOoFEzI2Ng7pJHc6bAZ64Bmy+yCKjsi7f9HYH7xYFkcZbpkp8TCnvJppFc1L8M22N3iNqhA+DLsTHboRstBXQG7Gp2hBkyBQVt9qJx8j6U5z62aUXDxnOuR1BLoe1BFYo8MjdXF2wUwRIZAyZ95Lkaf7JHX0rMzxpff7V7SSmwZsgRPFyY5coZ2hNh1dJmB3SkJ74Cfop2izIlnFlu7EnYFcGGhOktZgcR1o+y7j1lOgHEP470s5xmdES28LlTq7aupL+oKw8mTWy1AkjeqF5LJZlRp2hmE1xBDS4t9ZfD6LswC/k1VTl8mrsoAjVnOkTmTfBp2oRPckY8C+Azsayey7ewOqFQzLrvNFgtA4ufb+KKFGjCVaf+E465YVBZsFIAmowkuQFJwpa6iHVls7zaoaJixkupjn4DlZPhJ0VRmfM+kDaufMbY9qHxzrjJecq7Idd6tujNC7cEMOsem/J1fareFyinvEUB59O9wtKVcDfs89Pz5baKdZe9xiOXksx3UCcexXprB8kY22cTzmK2fDVWDYqwhoMbz/5cAvqW9axk2ff6I2BmDxVKoELE4BYD5/e+iy4UA8MbY8YA3I2ForE4dmPMdW4YmJ8zDtDuHKGdY5+8/ABVW4zo4W2GX8hmwc92Qk8Fk55dg7wpoi4S6W4cNLW1j4wD0O5DU7Iws72ezweYB07Xi58jgO7KC2cmkevos0ZdlvogAnEcbLKv0MqUW9/W1MKvIZsL0y/qw+XQ9MgY06UuzHOmVtBnQYoeOiQXDmi7ZOZLhzXh4h22wT3Z3iMVkWAZ7t40ljgt0cQYoyolaBxvaDpXx9hf0fnXnmeNFfwvZnLqwczO6ksasKlsaR8gcChXnGqdoVPy7nwP4rAcCwBtjaLnexqsevDBlYh+OfOfHbZ4m8v2k05s6WvL3HsFwaToXW8lWlI9r4346yIJhLrawP8jvurCQpQWgVWVqobwx7ZCKdzox/w7qB7WA5uSlDt89Bsrhm9sYel63fN/roVysdOAMxNxk8hB6GN9Fmipr812bPtWLpnDm2k4WoHFDjypQiR7zNGEC2sV6gqVlZeLQS9Pt8DQ42wWglb3XflAhOGW+t8SBdi+yfM9AfH8i5/tjNYEHRxPcDuDVGC4WPWqAle/UgXLY/gSSwsim0ST8+TcAeBeSLDNdD2ytI/roWihXjR7SD/jGAPwXVMEg1wiGQNtYbYQ1lC69m55WWxYcTmObMpstZ64dZAEaN/ZJOXYWZjVwHBh2tfgJVBJILpCSdfLJasB6DPuxuUof2anE8waWK2KtMOwLmaY5cJxILgwNOSrQBOoTznj7dQBvQuLSU2c1cmZAl0D5b0kbX2QIagMAf0VzdploDy/iEMW21ADD1ZEGxMg+AxXj3EsxY8SCKb6JNu3AU19OOMzDHr3TrPi5r4FTmu9fh8jAwVDpw06hze/tAN4pzTFdrRPGABxW8FJbPE0YHsgPkg2li+yjbv79NcQQbYOcdTYaYzie0/S9OQvIQVBximVUTljaVfTvlo1uWKKp7r7UAZ+g1oHyU1wLVflrDqNxJ0HOnNsB4JUYLtVnymbZefj1xKTeC+ArGWaOAPOdVqMUreV4KBvy0wSYyfkUC9Z7DjE01/WStjHabMovIRLAppcxmnfM2CYJMMeg7Ph7IilhN0mfXaLh1noAl+vEQkYIsNFfJmOMkSTpuyAFDF1teDeJZ8hnSpq5Fer01SUFT1on3yzaGxte/NlzDfuC//4KMeFMn8WfvQN28Zz8nVdr46jf/27ULzI07PqM941T5scc/fw+ASS+hO91Mtn4YvE8kysiRsL/f5AA6bVQNTNWFIxnFypG9JVinfA7DDQmG4mfL/PcF3yfiyz6IE5Z1y5XH8p9rAfgXySW6AvkYELPCNkhDls8T2AQwp6S8Tzeba6DqgPga7dhlrPNgkLzZw8r+UwXtXExkgyuNmy0KD30RAMALRZz7xxayCdh2LVm1AHRPP9uAXAqlLvRAcJuVRQKxO4VvHEcBpXfj2UDVEqfKajkkjvo3hPETA6C8jyY0OxJMvtIINT2Dqm5f41qDliWWo5DkME4s+4VZPwrwZWrvAEZzOJIQXW7GQ/Y4XmyhFChJt+jyTuHxEM7LZ+aL5uKS3v0ZHqmk2aZI6C5GO73MgA0zuPvs59tQI191M4A8O9QJ4Zzwo40alBjQP0eVKzmNQBOFExl3ADUOpoayWC4H5KU7kU2PY6J1tMl8QHANgBvAfD3SA4BfI+jS4ID29RDRXa5/1+T+s3zDgT4s9sdFmUeU7pCPCfQ7D03QBU/8XUY4AugD0Hi3GhSZs2m0K88pXQBtH0K/j6G+rJxpC1emRxyo2A5dQmffD4IVRP2UloLE4IhmQAIJygINZsXq47SWD4Q9wwxnKl5INbHGJGCEwjMOhWBmdyUmyJBGkgxSDwR84t69oVtq+eZoUnQuhnAj5A4DPbEDvhBVJeSZRvSi5nmXWyrWIMke6qJ2rcY2cVT8y7egV1yoi0veHYH9R8MpAHIA2R7nEXis5h3Olb1O/GJ/GUAngF12tjTQEoHIxO7YV6F8ECAWF98p0u2z7Og6pj+FH4PANJk0mL+VnHxmM8jCaHYwbcbGOSeqH3Pp8HxjJTnfbECQy8E23mbo4HyeIP3YyD6mOOz1lr0PX/2+wb3P6aCsXUV7rszDd7/qormSp4KCbJxvYfYW9p79QTz0n9OIw98zdGlG9TnoNJmnaVtQlWOG9/7W/Bn3Pdx/Y8A/UAaFsdItZvB/BjHACq7xBiSQwGfdJZ3lG9AOc4OiAmuoUlahU2Hn3kXVMWozWSr24XEJy4ttXOHmNYexHp6Bv3BzOGHUKdaj9GzZgtYXUgUfy9a2DZJAfizt0JFWWymMZ5Bkrpnb2rLzgrG1of9qgtVaGcZ1GnjOqhTrj6So/z9oLJkjMrOJ9N03wvlE/VuAM8hO9sJZGPlvnWVdQDugTrVuwVJ5lkIFTOquM2ASiawnswBDMjS9ul6f5kEUsbISufbMWEieYzU/t0Agqal0A2wMCuSt1K91JGrv8y7BSmq3gRtyoeSZnMUbU7LCZwXCxtcIEwtO6DSbP2KWN/9AO7DsIdBgOoM/wtWgoyByQKXuOJJlVb0oursnwHSj4iLnhlr72jTvrK7V+S46PQx1/s5avh8zUrhbDMWVc0laZc2eZcxJGF8gwL7VzAiNmYzBqOWOEUDal6Rg1ZaeZwRhiAHgKMS32mZmAVDa6WVVupdgy1oOcj/AakRpNTkpIDWAAAAAElFTkSuQmCC";

const Logo = ({ color, height = 36, className }) => {
  const ASPECT = 308 / 100;
  return (
    <div className={className} style={{
      width: height * ASPECT, height,
      backgroundColor: color,
      WebkitMaskImage: `url(${LOGO_SRC})`, maskImage: `url(${LOGO_SRC})`,
      WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center', maskPosition: 'center',
      flexShrink: 0,
    }} aria-label="Minuë" role="img" />
  );
};

// Paleta
const G = '#18332f';
const C = '#f8efe6';
const D = '#b8860b';
const CHOCOLATE = '#8B6B4A';

// Precio "vitrina" en cards — el real se calcula por tramos
const DISPLAY_PRICE = 19.90;

// ============================================================
// I18N — Español (base), Francés, Inglés, Alemán, Portugués
// ============================================================
const LANGS = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'pt', label: 'PT', name: 'Português' },
];

const I18N = {
  es: {
    nav_contact: 'Contacto', nav_catalog: 'Catálogo', nav_rates: 'Tarifas', nav_order: 'Pedido', nav_pdf: 'PDF', nav_faq: 'FAQ',
    hdr_eyebrow: 'B2B Wholesale · SS26',
    hdr_h1_a: 'Explora, selecciona', hdr_h1_b: 'y haz', hdr_h1_c: 'tu pedido.',
    hdr_sub: 'Navega por nuestro catálogo, añade los modelos que te interesen y envíanos tu selección. Precio por volumen: cuantas más unidades, menor precio unitario.',
    hdr_chip_top: 'Top Ventas', hdr_chip_rates: 'Ver tarifas por volumen',
    banner_expositor: 'Expositores incluidos desde 20 unidades — sin coste adicional',
    bar_your_tier: 'Tu tramo', bar_empty: 'Aún sin unidades — añade productos para ver tu precio.',
    bar_missing_a: 'Te faltan', bar_missing_b: 'uds para bajar a', bar_rate_btn: 'Ver tabla',
    top_eyebrow: '★ Top Ventas SS26',
    top_h2_month_pre: 'Los modelos que más rotan en', top_h2_c: '.',
    top_sub: 'Ordenados por rotación real en nuestros distribuidores actuales.',
    filter_color: 'Color', filter_shape: 'Forma', filter_clear: 'limpiar',
    col_eyebrow: 'Colección',
    col_essential_tag: 'La base del surtido. Formas atemporales, acetato estándar.',
    col_icons_tag: 'Diseños reconocibles con personalidad. Detalles premium.',
    col_acetato_tag: 'Monturas artesanales de alta gama. Para el cliente más exigente.',
    empty_filter_t: 'Sin modelos con este filtro',
    empty_filter_d: 'Prueba a ampliar la selección.',
    pkg_eyebrow: 'Packaging', pkg_h2_a: 'Listo para', pkg_h2_b: 'vitrina', pkg_h2_c: '.',
    pkg_sub: 'Cada montura llega preparada para exhibir. Sin reprocesar, sin empaquetar, sin perder tiempo.',
    pkg1_t: 'Packaging completo incluido',
    pkg1_d: 'Cada montura incluye: caja de presentación con logo, funda rígida, gamuza de microfibra, tarjeta con especificaciones técnicas y pegatina CE + UV400. Todo listo para entregar al cliente final sin ningún reprocesado.',
    pkg_contents_label: 'En cada caja',
    pkg_item1: 'Caja de presentación con logo',
    pkg_item2: 'Funda rígida individual',
    pkg_item3: 'Gamuza de microfibra',
    pkg_item4: 'Tarjeta con especificaciones técnicas',
    pkg_item5: 'Pegatina CE · UV400',
    tech_eyebrow: 'Especificaciones técnicas',
    tech_h2: 'Calidad certificada',
    tech_sub: 'Todos los modelos Minuë cumplen con la normativa europea de gafas de sol. Cada montura está homologada y certificada antes de salir de fábrica.',
    tech_uv: 'Protección UV400', tech_uv_d: 'Filtrado total de radiación ultravioleta UVA y UVB hasta 400nm. La máxima protección disponible.',
    tech_cat: 'Categoría 3', tech_cat_d: 'Lentes con alta capacidad de filtrado para uso en exteriores con sol intenso. Transmisión luminosa entre 8-18%.',
    tech_ce: 'Certificado CE', tech_ce_d: 'Conformidad con la normativa europea EN ISO 12312-1. Aptas para comercialización en toda la Unión Europea.',
    tech_pol: 'Lentes polarizadas', tech_pol_d: 'Eliminación de reflejos y deslumbramientos. Mayor contraste y definición visual en cualquier condición.',
    tech_impact: 'Resistencia al impacto', tech_impact_d: 'Superan el test de resistencia al impacto según normativa ISO. Patillas con alma de acero inoxidable en colección Acetato.',
    tech_drop: 'Drop Ball Test', tech_drop_d: 'Superan el test de impacto Drop Ball según EN ISO 12312-1. Resistencia certificada ante impactos frontales directos.',
    tech_fod: 'FOD — Free of Defects', tech_fod_d: 'Control de calidad individual por unidad. Cada montura sale de fábrica inspeccionada y aprobada.',
    pkg2_t: 'Protección premium',
    pkg2_d: 'Cada modelo en bolsa antirraya, bubble interno y caja maestra reforzada. Cero daños en tránsito.',
    pkg3_t: 'Display-ready',
    pkg3_d: 'Etiquetado con código de modelo y color. Los expositores incluidos en tu pedido llegan montados y listos.',
    cta_eyebrow: 'Tarifas por volumen',
    cta_h3_a: 'A más diseños,', cta_h3_b: 'mejor precio', cta_h3_c: '.', cta_h3_d: 'Desde 17,90€/ud en pedidos grandes.',
    cta_sub: 'Expositores incluidos desde 20 uds · Envío gratuito +20 uds · 3% pronto pago con plan de 2 pagos.',
    cta_btn: 'Ver tabla completa',
    ft_contact: 'Contacto', ft_conditions: 'Condiciones',
    ft_cond1: 'Precio desde 17,90€/ud (40+ uds)', ft_cond2: 'PVP recomendado 55–60€',
    ft_cond3: 'Envío gratuito +20 uds', ft_cond4: '3% dto. pronto pago (2 pagos)',
    ft_copyright: '© 2026 Minuë Opticians — Catálogo Wholesale SS26',
    ft_tagline: 'Un catálogo. Un minué.',
    panel_eyebrow: 'Pedido', panel_h3: 'Mi selección',
    panel_empty_t: 'Aún vacío', panel_empty_d: 'Añade los modelos que te interesen para enviarnos tu solicitud.',
    panel_tier: 'Tramo actual', panel_price: 'Precio/ud', panel_consult: 'Consultar',
    panel_add_more_a: 'Añade', panel_add_more_b: 'ud más →', panel_savings: 'ahorro',
    panel_total: 'Total', panel_units: 'uds', panel_free_ship: '+ envío gratuito',
    panel_region_label: '¿Dónde está tu tienda?',
    panel_region_hint_default: 'Tu pedido se envía a Minuë Opticians.',
    panel_region_hint_dist: 'Tu pedido se envía a nuestro distribuidor',
    panel_wa: 'Enviar por WhatsApp', panel_email: 'Enviar por email',
    panel_disclaimer: 'No es una compra. Es una solicitud de pedido — te confirmamos stock y plazos en menos de 24h.',
    panel_no_pay: '🔓 No necesitas pagar ahora',
    panel_no_pay_sub: 'Envíanos tu selección y te confirmamos disponibilidad, precio final y plazos antes de cualquier pago.',
    panel_mi_pedido: 'Mi pedido', panel_remove: 'eliminar',
    panel_added: 'Añadido', panel_add: 'Añadir',
    modal_eyebrow: 'Tarifas SS26',
    modal_h2_a: 'Precio por', modal_h2_b: 'volumen', modal_h2_c: ' — cuanto más pidas, menos pagas.',
    modal_your_tier: 'Tu tramo',
    modal_payments: 'Pagos:', modal_expositor: 'Expositor:', modal_free_ship: '✓ Envío gratuito',
    modal_plus60_label: '+60 uds', modal_plus60_t: 'Condiciones especiales',
    modal_plus60_d: 'Contáctanos directamente o escribe a',
    modal_early_t: 'Pronto pago', modal_early_d: '3% de descuento adicional en tarifas con plan de 2 pagos si abonas a la entrega.',
    modal_rrp_t: 'PVP recomendado', modal_rrp_d: 'Entre 55€ y 60€ al cliente final. Margen bruto medio del 67%.',
    modal_ship_t: 'Envío', modal_ship_d: 'Gratuito a partir de 20 unidades. Coste según destino por debajo de ese tramo.',
    modal_footer: 'Precios en euros, IVA no incluido. Tarifa válida para la temporada SS26.',
    order_greeting: 'Hola, me gustaría hacer un pedido:',
    order_tier: 'Tramo', order_total_line: 'Total',
    order_plus60: 'Total: {n} uds (tramo +60, precio a confirmar)',
    order_closing: 'Gracias',
    // shapes
    shape_round: 'Redonda', shape_oval: 'Ovalada', shape_square: 'Cuadrada',
    shape_rectangular: 'Rectangular', shape_cateye: 'Cat-eye', shape_panto: 'Panto',
    shape_geometric: 'Geométrica',
    // colors
    color_brown: 'Marrón', color_black: 'Negro', color_green: 'Verde', color_gold: 'Dorado',
    color_pink: 'Rosa', color_beige: 'Beige', color_gray: 'Gris', color_carey: 'Carey',
    hint_by_volume: 'según volumen',
    pvp_label: 'PVP rec.',
    margin_label: 'Margen',
    from_label: 'desde',
    most_popular: 'Más popular',
    roi_title: 'Rentabilidad estimada',
    roi_revenue: 'Ingresos',
    roi_margin: 'Margen bruto',
    roi_sell_at: 'Vendiendo a PVP ~',
    roi_disclaimer: 'PVP orientativo. Margen calculado sobre precio de coste actual.',
    // Urgencia
    urgency_stock_low: '⚡ Pocas unidades', urgency_hot: '🔥 Muy solicitado', urgency_trending: '📈 Tendencia',
    // Búsqueda
    search_placeholder: 'Buscar modelo... (ej. Lawrence, Bergman)',
    search_empty: 'Sin resultados para',
    // Tabs colección
    tab_all: 'Todos',
    // Por qué Minuë
    why_eyebrow: 'La marca que trabaja contigo',
    why_h2_a: 'No solo', why_h2_b: ' vendemos gafas', why_h2_c: '.',
    why_sub: 'Somos una marca emergente que construye su reputación cuidando a cada tienda que nos elige. Sin jugar en tu contra, sin intermediarios, con un equipo que coge el teléfono.',
    why_1_t: 'Sin mínimos. Sin complicaciones.', why_1_d: 'No hay pedido mínimo por modelo. Elige lo que necesitas, en las cantidades que necesitas. El proceso es simple: seleccionas, nos escribes y lo tienes en tu tienda.',
    why_2_t: 'Modelos que rotan + recambios cubiertos', why_2_d: 'Nuestros diseños están validados por datos de rotación real. Y si llega alguna unidad con defecto de fábrica, la cambiamos sin preguntas. Así de claro.',
    why_3_t: 'Apoyo digital para tu negocio', why_3_d: 'Te ayudamos con contenido para redes sociales, campañas de ads geolocalizadas en tu código postal y materiales visuales listos para usar. Tu escaparate, mejor vestido.',
    why_4_t: 'No competimos con nuestros clientes', why_4_d: 'No hacemos descuentos agresivos online ni vendemos directamente al público en los mismos canales que tú. Tu margen es tuyo. Lo protegemos.',
    why_presente: 'Presencia internacional',
    why_presente_d: 'Distribuimos en España, Francia, Portugal, Alemania y mercados emergentes a través de distribuidores locales.',
    why_faire: 'También en Faire',
    // Lead form
    lead_title: 'Un paso antes de enviar',
    lead_sub: 'Déjanos tus datos y te confirmamos disponibilidad y condiciones. Sin compromiso.',
    lead_name: 'Tu nombre',
    lead_store: 'Nombre de tu tienda / óptica',
    lead_email: 'Email de contacto',
    lead_submit_wa: 'Continuar a WhatsApp →',
    lead_submit_email: 'Continuar a email →',
    lead_skip: 'Saltar este paso',
    lead_note: 'Tus datos solo se usan para gestionar tu pedido. Nunca spam.',
    // Quick view
    qv_colors: 'Colores disponibles',
    qv_sku: 'Referencia',
    qv_collection: 'Colección',
    qv_shape: 'Forma',
    qv_rrp: 'PVP recomendado',
    qv_close: 'Cerrar',
    qv_add: 'Añadir al pedido',
    qv_added: 'Añadido',
    nav_badge: 'Trade Direct',
    nav_badge_sub: 'Selecciona y pide directo · sin registro',
    new_eyebrow: '✦ Novedades SS26',
    new_h2_a: 'Recién', new_h2_b: 'incorporados', new_h2_c: '.',
    new_sub: 'Primeras unidades disponibles. Pide antes de que se agoten.',
    new_show_more: 'Ver más modelos', new_show_less: 'Ver menos',
    new_badge: 'Nuevo',
    progress_browse: 'Explorando', progress_select: 'Seleccionando', progress_send: 'Enviando pedido',
    toast_added: 'añadido al pedido',
    filters_btn: 'Filtrar', filters_title: 'Filtros',
    share_btn: 'Compartir selección', share_copied: '¡Link copiado!',
    acetato_premium: 'Premium',
    latam_hint: 'Tu pedido va a Minuë Latinoamérica · hola@minueopticians.co',
    latam_badge: 'LATAM',
    region_latam_desc: 'Colombia · México · Chile · Argentina y más',
    col_show_all: 'Ver todos los modelos',
    col_collapse: 'Colapsar',
    col_models: 'modelos',
    col_expand_hint: 'Haz clic para explorar',
    tier_best: 'Más elegido',
    // Nuevas secciones de conversión
    hiw_eyebrow: 'El proceso', hiw_h2_a: 'Tres pasos', hiw_h2_b: ', todo claro.',
    hiw_1_t: 'Explora y añade', hiw_1_d: 'Navega por el catálogo y añade los modelos que te interesan. Sin registro, sin pago previo.',
    hiw_2_t: 'Envíanos tu lista', hiw_2_d: 'Por WhatsApp o email en un clic. Confirmamos stock, precio y plazos en menos de 24h.',
    hiw_3_t: 'Listo en tu tienda', hiw_3_d: 'Enviamos con packaging completo listo para vitrina. Pago tras confirmación.',
    hdr_claim: 'Márgenes del 60%+ en gafas que rotan de verdad.',
    hdr_sub_new: 'Colección SS26 para ópticas y multimarca que quieren una marca diferente. Sin mínimos, sin burocracia, con datos reales de venta.',
    sp_opticas: '150+ ópticas', sp_paises: '12 países', sp_sellthrough: '68% sell-through',
    ss26_banner: '🌿  Temporada SS26 abierta  ·  Nuevos modelos disponibles  ·  Stock limitado en referencias marcadas',
    faire_eyebrow: 'También disponible en Faire Wholesale',
    faire_rating: '4.9 / 5', faire_reviews: '47 valoraciones verificadas',
    faire_desc: 'Pedido mínimo reducido · Net 60 disponible · Envío desde España',
    faire_btn: 'Ver perfil en Faire →',
    clients_label: 'Últimas ópticas incorporadas',
    code_label: '¿Tienes un código especial?',
    code_placeholder: 'Introduce tu código',
    code_applied: '✓ Descuento del 5% aplicado',
    code_invalid: 'Código no válido',
    code_discount: 'Dto. código',
    ft_cta_h: '¿Prefieres hablar antes de pedir?',
    ft_cta_d: 'Nuestro equipo responde el mismo día. Sin presión, sin compromiso.',
    ft_cta_wa: 'Escribir por WhatsApp',
    ft_cta_email: 'Enviar email',
    tier_valid: 'Tarifa válida temporada SS26 · hasta 30 jun 2026',
    tier_save_label: 'Ahorras vs precio base',
    save_selection: 'Guardar selección',
    save_done: '✓ Guardada',
    share_partner: 'Compartir con socio',
    qv_qty_label: 'Cantidad',
    // FAQ
    faq_eyebrow: 'Preguntas frecuentes',
    faq_h2: 'Lo que suelen preguntar los retailers',
    faq_q1: '¿Cuál es el pedido mínimo?', faq_a1: 'No hay pedido mínimo. Puedes pedir desde 1 unidad, aunque los precios mejoran significativamente a partir de 10 uds. Consulta la tabla de tarifas arriba.',
    faq_q2: '¿Cómo funciona esta plataforma?', faq_a2: 'Es un catálogo B2B privado, no una tienda online. Seleccionas los modelos que te interesan, los añades al carrito y nos envías tu solicitud por WhatsApp o email. Te confirmamos stock, precio final y plazos en menos de 24h — sin necesidad de pagar nada hasta confirmación.',
    faq_q3: '¿Cuáles son los plazos de envío?', faq_a3: 'España peninsular: 2–4 días hábiles. Europa (Francia, Alemania, Portugal...): 4–7 días hábiles. Latinoamérica: 10–15 días hábiles a través de Minuë Latam. Para pedidos urgentes consúltanos.',
    faq_q4: '¿Qué incluye el expositor?', faq_a4: 'Un expositor de sobremesa compacto, diseñado para 5 monturas. Intencionadamente pequeño: ocupa menos espacio en mostrador y evita saturar al cliente con demasiadas opciones a la vez. Se incluye sin coste adicional a partir de 20 unidades, y 3 expositores en pedidos de 30+.',
    faq_q5: '¿Las gafas incluyen packaging?', faq_a5: 'Sí. Cada montura llega con caja de presentación, funda rígida, gamuza de microfibra, tarjeta técnica y pegatina CE+UV400. Listas para exponer sin ningún reprocesado.',
    faq_q6: '¿Están disponibles en Faire?', faq_a6: 'Sí. Puedes hacer tus pedidos en Faire Wholesale buscando "Minuë Opticians". También aceptamos pedidos directos para condiciones más flexibles.',
    faq_q7: '¿Qué garantía tienen los productos?', faq_a7: '2 años de garantía de fabricante. Si llega alguna unidad con defecto de fábrica, la reponemos sin coste ni burocracia.',
  },
  fr: {
    nav_contact: 'Contact', nav_catalog: 'Catalogue', nav_rates: 'Tarifs', nav_order: 'Commande', nav_pdf: 'PDF', nav_faq: 'FAQ',
    hdr_eyebrow: 'B2B Wholesale · SS26',
    hdr_h1_a: 'Explorez, sélectionnez', hdr_h1_b: 'et passez', hdr_h1_c: 'votre commande.',
    hdr_sub: 'Parcourez notre catalogue, ajoutez les modèles qui vous intéressent et envoyez-nous votre sélection. Prix dégressif : plus vous commandez, plus le prix unitaire baisse.',
    hdr_chip_top: 'Meilleures ventes', hdr_chip_rates: 'Voir les tarifs par volume',
    banner_expositor: 'Présentoirs inclus à partir de 20 unités — sans frais supplémentaires',
    bar_your_tier: 'Votre palier', bar_empty: 'Aucune unité — ajoutez des produits pour voir votre prix.',
    bar_missing_a: 'Il vous manque', bar_missing_b: 'unités pour passer à', bar_rate_btn: 'Voir le tableau',
    top_eyebrow: '★ Meilleures ventes SS26',
    top_h2_month_pre: 'Les modèles qui tournent le plus en', top_h2_c: '.',
    top_sub: 'Classés par rotation réelle chez nos distributeurs actuels.',
    filter_color: 'Couleur', filter_shape: 'Forme', filter_clear: 'effacer',
    col_eyebrow: 'Collection',
    col_essential_tag: 'La base de l\'assortiment. Formes intemporelles, acétate standard.',
    col_icons_tag: 'Designs reconnaissables avec du caractère. Détails premium.',
    col_acetato_tag: 'Acétate italien premium. Haut de gamme pour client exigeant.',
    empty_filter_t: 'Aucun modèle avec ce filtre',
    empty_filter_d: 'Essayez d\'élargir la sélection.',
    pkg_eyebrow: 'Packaging', pkg_h2_a: 'Prêt pour la', pkg_h2_b: 'vitrine', pkg_h2_c: '.',
    pkg_sub: 'Chaque monture arrive prête à être exposée. Sans retraitement, sans ré-emballage, sans perte de temps.',
    pkg1_t: 'Packaging complet inclus',
    pkg1_d: 'Chaque monture inclut : boîte de présentation avec logo, étui rigide, chiffon microfibre, carte de spécifications techniques et autocollant CE + UV400. Prêt pour le client final.',
    pkg_contents_label: 'Dans chaque boîte',
    pkg_item1: 'Boîte de présentation avec logo',
    pkg_item2: 'Étui rigide individuel',
    pkg_item3: 'Chiffon microfibre',
    pkg_item4: 'Carte de spécifications techniques',
    pkg_item5: 'Autocollant CE · UV400',
    tech_eyebrow: 'Spécifications techniques',
    tech_h2: 'Qualité certifiée',
    tech_sub: 'Tous les modèles Minuë sont conformes à la réglementation européenne sur les lunettes de soleil.',
    tech_uv: 'Protection UV400', tech_uv_d: 'Filtrage total des UV jusqu\'à 400nm. Protection maximale UVA et UVB.',
    tech_cat: 'Catégorie 3', tech_cat_d: 'Verres à haute capacité de filtrage pour usage en extérieur par fort ensoleillement.',
    tech_ce: 'Certificat CE', tech_ce_d: 'Conformité EN ISO 12312-1. Commercialisables dans toute l\'Union Européenne.',
    tech_pol: 'Verres polarisés', tech_pol_d: 'Élimination des reflets. Meilleur contraste et définition visuelle.',
    tech_impact: 'Résistance aux chocs', tech_impact_d: 'Tests de résistance ISO réussis. Branches avec âme acier (collection Acétate).',
    tech_drop: 'Drop Ball Test', tech_drop_d: 'Test d\'impact Drop Ball réussi selon EN ISO 12312-1.',
    tech_fod: 'FOD — Sans défaut', tech_fod_d: 'Contrôle qualité individuel. Chaque monture inspectée et approuvée à la sortie d\'usine.',
    pkg2_t: 'Protection premium',
    pkg2_d: 'Chaque modèle en pochette anti-rayures, protection bulle interne et carton renforcé. Zéro dégât en transit.',
    pkg3_t: 'Prêt pour le display',
    pkg3_d: 'Étiquetage par modèle et couleur. Les présentoirs inclus arrivent montés et prêts à l\'emploi.',
    cta_eyebrow: 'Tarifs par volume',
    cta_h3_a: 'Plus de modèles,', cta_h3_b: 'meilleur prix', cta_h3_c: '.', cta_h3_d: 'À partir de 17,90€/u pour les grosses commandes.',
    cta_sub: 'Présentoirs offerts dès 20 u · Livraison gratuite +20 u · 3% paiement anticipé (plan en 2 fois).',
    cta_btn: 'Voir le tableau complet',
    ft_contact: 'Contact', ft_conditions: 'Conditions',
    ft_cond1: 'Prix à partir de 17,90€/u (40+ u)', ft_cond2: 'Prix public conseillé 55–60€',
    ft_cond3: 'Livraison gratuite +20 u', ft_cond4: '3% rem. paiement anticipé',
    ft_copyright: '© 2026 Minuë Opticians — Catalogue Wholesale SS26',
    ft_tagline: 'Un catalogue. Un menuet.',
    panel_eyebrow: 'Commande', panel_h3: 'Ma sélection',
    panel_empty_t: 'Encore vide', panel_empty_d: 'Ajoutez les modèles qui vous intéressent pour nous envoyer votre demande.',
    panel_tier: 'Palier actuel', panel_price: 'Prix/u', panel_consult: 'Nous consulter',
    panel_add_more_a: 'Ajoutez', panel_add_more_b: 'unités →', panel_savings: 'économie',
    panel_total: 'Total', panel_units: 'u', panel_free_ship: '+ livraison gratuite',
    panel_region_label: 'Où est votre boutique ?',
    panel_region_hint_default: 'Votre commande est envoyée à Minuë Opticians.',
    panel_region_hint_dist: 'Votre commande est envoyée à notre distributeur',
    panel_wa: 'Envoyer par WhatsApp', panel_email: 'Envoyer par email',
    panel_disclaimer: 'Ce n\'est pas un achat. C\'est une demande de commande — nous vous confirmons le stock et les délais en moins de 24h.',
    panel_no_pay: '🔓 Aucun paiement requis maintenant',
    panel_no_pay_sub: 'Envoyez votre sélection et nous confirmons disponibilité, prix final et délais avant tout paiement.',
    panel_mi_pedido: 'Ma commande', panel_remove: 'supprimer',
    panel_added: 'Ajouté', panel_add: 'Ajouter',
    modal_eyebrow: 'Tarifs SS26',
    modal_h2_a: 'Prix par', modal_h2_b: 'volume', modal_h2_c: ' — plus vous commandez, moins vous payez.',
    modal_your_tier: 'Votre palier',
    modal_payments: 'Paiements :', modal_expositor: 'Présentoir :', modal_free_ship: '✓ Livraison gratuite',
    modal_plus60_label: '+60 u', modal_plus60_t: 'Conditions spéciales',
    modal_plus60_d: 'Contactez-nous directement ou écrivez à',
    modal_early_t: 'Paiement anticipé', modal_early_d: '3% de remise supplémentaire sur les plans en 2 fois si vous payez à la livraison.',
    modal_rrp_t: 'Prix public conseillé', modal_rrp_d: 'Entre 55€ et 60€ client final. Marge brute moyenne de 67%.',
    modal_ship_t: 'Livraison', modal_ship_d: 'Gratuite à partir de 20 unités. Frais selon destination en-dessous.',
    modal_footer: 'Prix en euros, HT. Tarifs valables pour la saison SS26.',
    order_greeting: 'Bonjour, je voudrais passer une commande :',
    order_tier: 'Palier', order_total_line: 'Total',
    order_plus60: 'Total : {n} u (palier +60, prix à confirmer)',
    order_closing: 'Merci',
    shape_round: 'Ronde', shape_oval: 'Ovale', shape_square: 'Carrée',
    shape_rectangular: 'Rectangulaire', shape_cateye: 'Œil de chat', shape_panto: 'Panto',
    shape_geometric: 'Géométrique',
    color_brown: 'Marron', color_black: 'Noir', color_green: 'Vert', color_gold: 'Doré',
    color_pink: 'Rose', color_beige: 'Beige', color_gray: 'Gris', color_carey: 'Écaille',
    hint_by_volume: 'selon volume',
    pvp_label: 'PPC rec.',
    margin_label: 'Marge',
    from_label: 'dès',
    most_popular: 'Le plus populaire',
    roi_title: 'Rentabilité estimée',
    roi_revenue: 'Revenus',
    roi_margin: 'Marge brute',
    roi_sell_at: 'En vendant à PPC ~',
    roi_disclaimer: 'PPC indicatif. Marge calculée sur le prix de revient actuel.',
    urgency_stock_low: '⚡ Stock limité', urgency_hot: '🔥 Très demandé', urgency_trending: '📈 Tendance',
    search_placeholder: 'Rechercher un modèle... (ex. Lawrence, Bergman)',
    search_empty: 'Aucun résultat pour',
    tab_all: 'Tous',
    why_eyebrow: 'La marque qui travaille avec vous',
    why_h2_a: 'Plus que', why_h2_b: ' des lunettes', why_h2_c: '.',
    why_sub: 'Nous sommes une marque émergente qui construit sa réputation en prenant soin de chaque boutique qui nous choisit. Sans jouer contre vous, sans intermédiaires.',
    why_1_t: 'Sans minimum. Sans complications.', why_1_d: 'Aucun minimum de commande par modèle. Choisissez ce dont vous avez besoin, en quantités adaptées. Sélectionnez, écrivez-nous et recevez en boutique.',
    why_2_t: 'Modèles qui tournent + échanges couverts', why_2_d: "Nos designs sont validés par des données de rotation réelles. Si une unité présente un défaut de fabrication, nous l'échangeons sans question.",
    why_3_t: 'Soutien digital pour votre commerce', why_3_d: "Nous vous aidons avec du contenu réseaux sociaux, des campagnes publicitaires géolocalisées sur votre code postal et des visuels prêts à l'emploi.",
    why_4_t: 'Nous ne concurrençons pas nos clients', why_4_d: 'Pas de remises agressives en ligne, pas de vente directe au public sur vos mêmes canaux. Votre marge reste à vous.',
    why_presente: 'Présence internationale',
    why_presente_d: 'Distribution en Espagne, France, Portugal, Allemagne et marchés émergents via des distributeurs locaux.',
    why_faire: 'Aussi sur Faire',
    lead_title: 'Une étape avant d\'envoyer',
    lead_sub: 'Laissez-nous vos coordonnées et nous confirmons disponibilité et conditions. Sans engagement.',
    lead_name: 'Votre nom',
    lead_store: 'Nom de votre boutique / optique',
    lead_email: 'Email de contact',
    lead_submit_wa: 'Continuer sur WhatsApp →',
    lead_submit_email: 'Continuer par email →',
    lead_skip: 'Passer cette étape',
    lead_note: 'Vos données servent uniquement à gérer votre commande. Jamais de spam.',
    qv_colors: 'Couleurs disponibles', qv_sku: 'Référence', qv_collection: 'Collection',
    qv_shape: 'Forme', qv_rrp: 'PPC conseillé', qv_close: 'Fermer', qv_add: 'Ajouter à la commande', qv_added: 'Ajouté',
    nav_badge: 'Trade Direct',
    nav_badge_sub: 'Sélectionnez et commandez · sans inscription',
    new_eyebrow: '✦ Nouveautés SS26',
    new_h2_a: 'Tout', new_h2_b: 'juste arrivés', new_h2_c: '.',
    new_sub: 'Premières pièces disponibles. Commandez avant rupture de stock.',
    new_show_more: 'Voir plus de modèles', new_show_less: 'Voir moins',
    new_badge: 'Nouveau',
    progress_browse: 'Navigation', progress_select: 'Sélection', progress_send: 'Envoi commande',
    toast_added: 'ajouté à la commande',
    filters_btn: 'Filtrer', filters_title: 'Filtres',
    share_btn: 'Partager la sélection', share_copied: 'Lien copié !',
    acetato_premium: 'Premium',
    latam_hint: 'Votre commande → Minuë Latinoamérica',
    latam_badge: 'LATAM',
    region_latam_desc: 'Colombie · Mexique · Chili et plus',
    col_show_all: 'Voir tous les modèles',
    col_collapse: 'Réduire',
    col_models: 'modèles',
    col_expand_hint: 'Cliquez pour explorer',
    tier_best: 'Le plus choisi',
    ss26_banner: '🌿  Saison SS26 ouverte  ·  Nouveaux modèles disponibles  ·  Stock limité',
    faq_eyebrow: 'Questions fréquentes', faq_h2: 'Ce que demandent souvent les retailers',
    faq_q1: 'Quelle est la commande minimale ?', faq_a1: "Il n'y a pas de minimum. Vous pouvez commander à partir d'1 unité, mais les prix s'améliorent significativement à partir de 10 unités.",
    faq_q2: 'Comment fonctionne cette plateforme ?', faq_a2: "C'est un catalogue B2B privé, pas une boutique en ligne. Sélectionnez les modèles, ajoutez-les au panier et envoyez-nous votre demande par WhatsApp ou email. Confirmation stock et prix en moins de 24h.",
    faq_q3: 'Quels sont les délais de livraison ?', faq_a3: 'Espagne : 2–4 jours ouvrés. France et Europe : 4–7 jours ouvrés. Amérique latine : 10–15 jours via Minuë Latam.',
    faq_q4: "Qu'est-ce qui est inclus dans le présentoir ?", faq_a4: 'Un présentoir de comptoir compact, conçu pour 5 montures. Volontairement petit : il prend moins de place et évite de saturer le client avec trop de choix. Inclus sans frais à partir de 20 unités.',
    faq_q5: 'Les lunettes incluent-elles un packaging ?', faq_a5: 'Oui. Chaque monture est livrée avec boîte, étui rigide, chiffon microfibre, fiche technique et autocollant CE+UV400.',
    faq_q6: 'Sont-ils disponibles sur Faire ?', faq_a6: 'Oui. Commandez directement sur Faire Wholesale en cherchant "Minuë Opticians".',
    faq_q7: 'Quelle est la garantie ?', faq_a7: '2 ans de garantie fabricant. Défaut de fabrication = remplacement sans frais.',
  },
  en: {
    nav_contact: 'Contact', nav_catalog: 'Catalogue', nav_rates: 'Pricing', nav_order: 'Order', nav_pdf: 'PDF', nav_faq: 'FAQ',
    hdr_eyebrow: 'B2B Wholesale · SS26',
    hdr_h1_a: 'Browse, select', hdr_h1_b: 'and place', hdr_h1_c: 'your order.',
    hdr_sub: 'Explore our catalogue, add the models you like and send us your selection. Volume pricing: the more units, the lower the unit price.',
    hdr_chip_top: 'Top Sellers', hdr_chip_rates: 'See volume pricing',
    banner_expositor: 'Displays included from 20+ units — no extra cost',
    bar_your_tier: 'Your tier', bar_empty: 'No units yet — add products to see your price.',
    bar_missing_a: 'You need', bar_missing_b: 'more units to drop to', bar_rate_btn: 'View table',
    top_eyebrow: '★ Top Sellers SS26',
    top_h2_month_pre: 'The models selling fastest this', top_h2_c: '.',
    top_sub: 'Ranked by actual turnover across our current stockists.',
    filter_color: 'Colour', filter_shape: 'Shape', filter_clear: 'clear',
    col_eyebrow: 'Collection',
    col_essential_tag: 'The foundation of the range. Timeless shapes, standard acetate.',
    col_icons_tag: 'Recognizable designs with character. Premium details.',
    col_acetato_tag: 'Premium Italian acetate. High-end for discerning clients.',
    empty_filter_t: 'No models with this filter',
    empty_filter_d: 'Try broadening the selection.',
    pkg_eyebrow: 'Packaging', pkg_h2_a: 'Shelf-', pkg_h2_b: 'ready', pkg_h2_c: '.',
    pkg_sub: 'Every frame arrives ready to display. No repackaging, no unboxing work, no time wasted.',
    pkg1_t: 'Full packaging included',
    pkg1_d: 'Each frame includes: branded presentation box, hard case, microfibre cloth, technical specs card and CE + UV400 sticker. Ready for end customer, no repackaging needed.',
    pkg_contents_label: 'In every box',
    pkg_item1: 'Branded presentation box',
    pkg_item2: 'Individual hard case',
    pkg_item3: 'Microfibre cloth',
    pkg_item4: 'Technical specifications card',
    pkg_item5: 'CE · UV400 sticker',
    tech_eyebrow: 'Technical specifications',
    tech_h2: 'Certified quality',
    tech_sub: 'All Minuë models comply with European sunglasses regulations. Every frame is certified before leaving the factory.',
    tech_uv: 'UV400 Protection', tech_uv_d: 'Full UVA and UVB filtration up to 400nm. Maximum available protection.',
    tech_cat: 'Category 3', tech_cat_d: 'High-filter lenses for outdoor use in bright sunlight. Light transmission 8-18%.',
    tech_ce: 'CE Certified', tech_ce_d: 'Compliant with EN ISO 12312-1. Approved for sale across the European Union.',
    tech_pol: 'Polarised lenses', tech_pol_d: 'Eliminates glare and reflections. Enhanced contrast and visual definition.',
    tech_impact: 'Impact resistance', tech_impact_d: 'ISO impact resistance tests passed. Steel-core temples on Acetato collection.',
    tech_drop: 'Drop Ball Test', tech_drop_d: 'Pass the Drop Ball impact test per EN ISO 12312-1. Certified resistance to direct frontal impact.',
    tech_fod: 'FOD — Free of Defects', tech_fod_d: 'Individual quality control per unit. Every frame inspected and approved at factory.',
    pkg2_t: 'Premium protection',
    pkg2_d: 'Each model in anti-scratch sleeve, internal bubble wrap and reinforced master box. Zero in-transit damage.',
    pkg3_t: 'Display-ready',
    pkg3_d: 'Labelled by model and colour code. Displays included in your order arrive assembled and ready to use.',
    cta_eyebrow: 'Volume pricing',
    cta_h3_a: 'More designs,', cta_h3_b: 'better price', cta_h3_c: '.', cta_h3_d: 'From €17.90/unit on larger orders.',
    cta_sub: 'Free displays from 20 units · Free shipping 20+ units · 3% early-payment discount on 2-instalment plans.',
    cta_btn: 'See full table',
    ft_contact: 'Contact', ft_conditions: 'Terms',
    ft_cond1: 'From €17.90/unit (40+ units)', ft_cond2: 'RRP €55–60',
    ft_cond3: 'Free shipping 20+ units', ft_cond4: '3% early-payment discount (2 instalments)',
    ft_copyright: '© 2026 Minuë Opticians — Wholesale Catalogue SS26',
    ft_tagline: 'One catalogue. One minuet.',
    panel_eyebrow: 'Order', panel_h3: 'My selection',
    panel_empty_t: 'Still empty', panel_empty_d: 'Add the models you\'re interested in to send us your request.',
    panel_tier: 'Current tier', panel_price: 'Price/unit', panel_consult: 'Contact us',
    panel_add_more_a: 'Add', panel_add_more_b: 'more units →', panel_savings: 'save',
    panel_total: 'Total', panel_units: 'units', panel_free_ship: '+ free shipping',
    panel_region_label: 'Where is your shop?',
    panel_region_hint_default: 'Your order goes to Minuë Opticians directly.',
    panel_region_hint_dist: 'Your order goes to our distributor',
    panel_wa: 'Send via WhatsApp', panel_email: 'Send via email',
    panel_disclaimer: 'This is not a purchase. It\'s an order request — we\'ll confirm stock and lead times within 24h.',
    panel_no_pay: '🔓 No payment required now',
    panel_no_pay_sub: 'Send your selection and we\'ll confirm availability, final price and lead times before any payment.',
    panel_mi_pedido: 'My order', panel_remove: 'remove',
    panel_added: 'Added', panel_add: 'Add',
    modal_eyebrow: 'SS26 Pricing',
    modal_h2_a: 'Volume', modal_h2_b: 'pricing', modal_h2_c: ' — the more you order, the less you pay.',
    modal_your_tier: 'Your tier',
    modal_payments: 'Payments:', modal_expositor: 'Display:', modal_free_ship: '✓ Free shipping',
    modal_plus60_label: '+60 units', modal_plus60_t: 'Special terms',
    modal_plus60_d: 'Contact us directly or write to',
    modal_early_t: 'Early payment', modal_early_d: '3% additional discount on 2-instalment plans if you pay at delivery.',
    modal_rrp_t: 'Recommended RRP', modal_rrp_d: 'Between €55 and €60 end customer. Average 67% gross margin.',
    modal_ship_t: 'Shipping', modal_ship_d: 'Free from 20 units. Cost depends on destination below that tier.',
    modal_footer: 'Prices in euros, VAT excluded. Rates valid for the SS26 season.',
    order_greeting: 'Hello, I would like to place an order:',
    order_tier: 'Tier', order_total_line: 'Total',
    order_plus60: 'Total: {n} units (+60 tier, price TBC)',
    order_closing: 'Thanks',
    shape_round: 'Round', shape_oval: 'Oval', shape_square: 'Square',
    shape_rectangular: 'Rectangular', shape_cateye: 'Cat-eye', shape_panto: 'Panto',
    shape_geometric: 'Geometric',
    color_brown: 'Brown', color_black: 'Black', color_green: 'Green', color_gold: 'Gold',
    color_pink: 'Pink', color_beige: 'Beige', color_gray: 'Grey', color_carey: 'Tortoise',
    hint_by_volume: 'by volume',
    pvp_label: 'RRP',
    margin_label: 'Margin',
    from_label: 'from',
    most_popular: 'Most popular',
    roi_title: 'Estimated profitability',
    roi_revenue: 'Revenue',
    roi_margin: 'Gross margin',
    roi_sell_at: 'Selling at RRP ~',
    roi_disclaimer: 'Indicative RRP. Margin calculated on current unit cost.',
    urgency_stock_low: '⚡ Low stock', urgency_hot: '🔥 High demand', urgency_trending: '📈 Trending',
    search_placeholder: 'Search model... (e.g. Lawrence, Bergman)',
    search_empty: 'No results for',
    tab_all: 'All',
    why_eyebrow: 'The brand that works with you',
    why_h2_a: 'More than', why_h2_b: ' just eyewear', why_h2_c: '.',
    why_sub: 'We are an emerging brand building our reputation by taking care of every store that chooses us. No playing against you, no middlemen, a team that actually picks up.',
    why_1_t: 'No minimums. No complications.', why_1_d: 'No minimum order per model. Pick what you need, in the quantities that work for you. Select, message us and it arrives at your store.',
    why_2_t: 'Proven sellers + defect cover', why_2_d: 'Our designs are validated by real sell-through data. And if any unit has a factory defect, we replace it — no questions asked.',
    why_3_t: 'Digital support for your business', why_3_d: 'We help with social media content, geo-targeted ad campaigns in your postcode and ready-to-use visual assets. Your shopfront, better dressed.',
    why_4_t: "We don't compete with our clients", why_4_d: 'No aggressive online discounts, no direct-to-consumer sales on your channels. Your margin is yours. We protect it.',
    why_presente: 'International presence',
    why_presente_d: 'Distribution in Spain, France, Portugal, Germany and emerging markets through local distributors.',
    why_faire: 'Also on Faire',
    lead_title: 'One step before sending',
    lead_sub: 'Leave your details and we confirm availability and terms. No commitment.',
    lead_name: 'Your name',
    lead_store: 'Your store / practice name',
    lead_email: 'Contact email',
    lead_submit_wa: 'Continue to WhatsApp →',
    lead_submit_email: 'Continue to email →',
    lead_skip: 'Skip this step',
    lead_note: 'Your data is only used to manage your order. Never spam.',
    qv_colors: 'Available colours', qv_sku: 'Reference', qv_collection: 'Collection',
    qv_shape: 'Shape', qv_rrp: 'Recommended RRP', qv_close: 'Close', qv_add: 'Add to order', qv_added: 'Added',
    nav_badge: 'Trade Direct',
    nav_badge_sub: 'Select and order directly · no account needed',
    new_eyebrow: '✦ New Arrivals SS26',
    new_h2_a: 'Just', new_h2_b: 'landed', new_h2_c: '.',
    new_sub: 'First units available. Order before they sell out.',
    new_show_more: 'Show more models', new_show_less: 'Show less',
    new_badge: 'New',
    progress_browse: 'Browsing', progress_select: 'Selecting', progress_send: 'Sending order',
    toast_added: 'added to order',
    filters_btn: 'Filter', filters_title: 'Filters',
    share_btn: 'Share selection', share_copied: 'Link copied!',
    acetato_premium: 'Premium',
    latam_hint: 'Your order goes to Minuë Latin America',
    latam_badge: 'LATAM',
    region_latam_desc: 'Colombia · Mexico · Chile · Argentina and more',
    col_show_all: 'See all models',
    col_collapse: 'Collapse',
    col_models: 'models',
    col_expand_hint: 'Click to explore',
    tier_best: 'Most popular',
    ss26_banner: '🌿  SS26 Season Open  ·  New models available  ·  Limited stock',
    faq_eyebrow: 'FAQs', faq_h2: 'What retailers usually ask',
    faq_q1: 'What is the minimum order?', faq_a1: 'There is no minimum. You can order from 1 unit, but prices improve significantly from 10 units.',
    faq_q2: 'How does this platform work?', faq_a2: 'This is a private B2B catalog, not an online store. Select models, add to cart and send your request via WhatsApp or email. We confirm stock, price and delivery within 24h — no payment required until confirmation.',
    faq_q3: 'What are the delivery times?', faq_a3: 'Spain: 2–4 business days. Europe: 4–7 business days. Latin America: 10–15 business days via Minuë Latam.',
    faq_q4: 'What does the display stand include?', faq_a4: 'A compact countertop display designed for 5 frames. Intentionally small: takes up less counter space and avoids overwhelming customers with too many options at once. Included at no extra cost from 20 units.',
    faq_q5: 'Do the glasses include packaging?', faq_a5: 'Yes. Each frame comes with box, rigid case, microfibre cloth, tech card and CE+UV400 sticker — ready to display immediately.',
    faq_q6: 'Are they available on Faire?', faq_a6: 'Yes. Order directly on Faire Wholesale by searching "Minuë Opticians".',
    faq_q7: 'What warranty do the products have?', faq_a7: '2-year manufacturer warranty. Factory defects replaced at no cost.',
  },
  de: {
    nav_contact: 'Kontakt', nav_catalog: 'Katalog', nav_rates: 'Preise', nav_order: 'Bestellung', nav_pdf: 'PDF', nav_faq: 'FAQ',
    hdr_eyebrow: 'B2B Wholesale · SS26',
    hdr_h1_a: 'Stöbern, auswählen', hdr_h1_b: 'und', hdr_h1_c: 'bestellen.',
    hdr_sub: 'Durchstöbern Sie unseren Katalog, fügen Sie die gewünschten Modelle hinzu und senden Sie uns Ihre Auswahl. Mengenrabatt: je mehr Stück, desto niedriger der Stückpreis.',
    hdr_chip_top: 'Bestseller', hdr_chip_rates: 'Mengenstaffelung ansehen',
    banner_expositor: 'Displays inklusive ab 20 Stück — ohne Aufpreis',
    bar_your_tier: 'Ihre Staffel', bar_empty: 'Noch keine Einheiten — fügen Sie Produkte hinzu.',
    bar_missing_a: 'Noch', bar_missing_b: 'Stk. für', bar_rate_btn: 'Tabelle ansehen',
    top_eyebrow: '★ Bestseller SS26',
    top_h2_month_pre: 'Die meistverkauften Modelle im', top_h2_c: '.',
    top_sub: 'Nach tatsächlicher Umschlagsrate unserer aktuellen Vertriebspartner.',
    filter_color: 'Farbe', filter_shape: 'Form', filter_clear: 'löschen',
    col_eyebrow: 'Kollektion',
    col_essential_tag: 'Die Basis des Sortiments. Zeitlose Formen, Standard-Azetat.',
    col_icons_tag: 'Wiedererkennbare Designs mit Charakter. Premium-Details.',
    col_acetato_tag: 'Italienisches Premium-Azetat. Oberklasse für anspruchsvolle Kunden.',
    empty_filter_t: 'Keine Modelle mit diesem Filter',
    empty_filter_d: 'Versuchen Sie, die Auswahl zu erweitern.',
    pkg_eyebrow: 'Verpackung', pkg_h2_a: 'Vitrinen-', pkg_h2_b: 'fertig', pkg_h2_c: '.',
    pkg_sub: 'Jede Fassung kommt ausstellungsbereit an. Kein Umpacken, kein Zeitverlust.',
    pkg1_t: 'Vollständige Verpackung inklusive',
    pkg1_d: 'Jede Fassung enthält: gebrandete Präsentationsbox, Hartschalen-Etui, Mikrofasertuch, Karte mit technischen Daten und CE + UV400 Aufkleber. Bereit für den Endkunden.',
    pkg_contents_label: 'In jeder Box',
    pkg_item1: 'Gebrandete Präsentationsbox',
    pkg_item2: 'Individuelles Hartschalen-Etui',
    pkg_item3: 'Mikrofasertuch',
    pkg_item4: 'Karte mit technischen Daten',
    pkg_item5: 'CE · UV400 Aufkleber',
    tech_eyebrow: 'Technische Spezifikationen',
    tech_h2: 'Zertifizierte Qualität',
    tech_sub: 'Alle Minuë-Modelle erfüllen die europäischen Vorschriften für Sonnenbrillen.',
    tech_uv: 'UV400-Schutz', tech_uv_d: 'Vollständige UVA- und UVB-Filterung bis 400nm.',
    tech_cat: 'Kategorie 3', tech_cat_d: 'Hochfiltergläser für Outdoor-Einsatz bei starker Sonneneinstrahlung.',
    tech_ce: 'CE-Zertifikat', tech_ce_d: 'Konform mit EN ISO 12312-1. Zugelassen für den Verkauf in der EU.',
    tech_pol: 'Polarisierte Gläser', tech_pol_d: 'Eliminiert Blendung und Reflexionen.',
    tech_impact: 'Stoßfestigkeit', tech_impact_d: 'ISO-Stoßfestigkeitstests bestanden. Stahlkernbügel bei der Acetato-Kollektion.',
    tech_drop: 'Drop Ball Test', tech_drop_d: 'Drop-Ball-Test nach EN ISO 12312-1 bestanden.',
    tech_fod: 'FOD — Defektfrei', tech_fod_d: 'Individuelle Qualitätskontrolle. Jede Fassung geprüft und freigegeben.',
    pkg2_t: 'Premium-Schutz',
    pkg2_d: 'Jedes Modell in Anti-Kratz-Beutel, Luftpolster innen und verstärktem Hauptkarton. Null Transportschäden.',
    pkg3_t: 'Display-ready',
    pkg3_d: 'Etikettiert nach Modell und Farbcode. Die in Ihrer Bestellung enthaltenen Displays kommen montiert an.',
    cta_eyebrow: 'Mengenstaffelung',
    cta_h3_a: 'Mehr Modelle,', cta_h3_b: 'besserer Preis', cta_h3_c: '.', cta_h3_d: 'Ab 17,90€/Stk. bei Großbestellungen.',
    cta_sub: 'Gratis-Displays ab 20 Stk · Gratisversand ab 20 Stk · 3% Skonto bei 2-Raten-Plan.',
    cta_btn: 'Vollständige Tabelle',
    ft_contact: 'Kontakt', ft_conditions: 'Konditionen',
    ft_cond1: 'Ab 17,90€/Stk. (40+ Stk)', ft_cond2: 'UVP 55–60€',
    ft_cond3: 'Gratisversand ab 20 Stk', ft_cond4: '3% Skonto (2 Raten)',
    ft_copyright: '© 2026 Minuë Opticians — Wholesale-Katalog SS26',
    ft_tagline: 'Ein Katalog. Ein Menuett.',
    panel_eyebrow: 'Bestellung', panel_h3: 'Meine Auswahl',
    panel_empty_t: 'Noch leer', panel_empty_d: 'Fügen Sie die gewünschten Modelle hinzu, um Ihre Anfrage zu senden.',
    panel_tier: 'Aktuelle Staffel', panel_price: 'Preis/Stk', panel_consult: 'Auf Anfrage',
    panel_add_more_a: 'Fügen Sie', panel_add_more_b: 'Stk. hinzu →', panel_savings: 'Ersparnis',
    panel_total: 'Gesamt', panel_units: 'Stk', panel_free_ship: '+ Gratisversand',
    panel_region_label: 'Wo ist Ihr Geschäft?',
    panel_region_hint_default: 'Ihre Bestellung geht direkt an Minuë Opticians.',
    panel_region_hint_dist: 'Ihre Bestellung geht an unseren Distributor',
    panel_wa: 'Per WhatsApp senden', panel_email: 'Per E-Mail senden',
    panel_disclaimer: 'Kein Kauf. Eine Bestellanfrage — wir bestätigen Verfügbarkeit und Lieferfristen innerhalb von 24h.',
    panel_no_pay: '🔓 Jetzt keine Zahlung erforderlich',
    panel_no_pay_sub: 'Senden Sie Ihre Auswahl — wir bestätigen Verfügbarkeit, Endpreis und Lieferfristen vor jeder Zahlung.',
    panel_mi_pedido: 'Meine Bestellung', panel_remove: 'entfernen',
    panel_added: 'Hinzugefügt', panel_add: 'Hinzufügen',
    modal_eyebrow: 'Preise SS26',
    modal_h2_a: 'Preis nach', modal_h2_b: 'Volumen', modal_h2_c: ' — je mehr Sie bestellen, desto weniger zahlen Sie.',
    modal_your_tier: 'Ihre Staffel',
    modal_payments: 'Zahlung:', modal_expositor: 'Display:', modal_free_ship: '✓ Gratisversand',
    modal_plus60_label: '+60 Stk', modal_plus60_t: 'Sonderkonditionen',
    modal_plus60_d: 'Kontaktieren Sie uns direkt oder schreiben Sie an',
    modal_early_t: 'Skonto', modal_early_d: '3% zusätzlicher Rabatt bei 2-Raten-Plan und Zahlung bei Lieferung.',
    modal_rrp_t: 'UVP', modal_rrp_d: 'Zwischen 55€ und 60€ Endkunde. Durchschnittliche Bruttomarge 67%.',
    modal_ship_t: 'Versand', modal_ship_d: 'Gratis ab 20 Stück. Kosten nach Zielort unterhalb dieser Staffel.',
    modal_footer: 'Preise in Euro, MwSt. nicht enthalten. Preise gültig für die SS26-Saison.',
    order_greeting: 'Hallo, ich möchte eine Bestellung aufgeben:',
    order_tier: 'Staffel', order_total_line: 'Gesamt',
    order_plus60: 'Gesamt: {n} Stk (Staffel +60, Preis zu bestätigen)',
    order_closing: 'Danke',
    shape_round: 'Rund', shape_oval: 'Oval', shape_square: 'Eckig',
    shape_rectangular: 'Rechteckig', shape_cateye: 'Cat-eye', shape_panto: 'Panto',
    shape_geometric: 'Geometrisch',
    color_brown: 'Braun', color_black: 'Schwarz', color_green: 'Grün', color_gold: 'Gold',
    color_pink: 'Rosa', color_beige: 'Beige', color_gray: 'Grau', color_carey: 'Havanna',
    hint_by_volume: 'nach Menge',
    pvp_label: 'UVP',
    margin_label: 'Marge',
    from_label: 'ab',
    most_popular: 'Beliebteste',
    roi_title: 'Geschätzte Rentabilität',
    roi_revenue: 'Einnahmen',
    roi_margin: 'Bruttomarge',
    roi_sell_at: 'Verkauf zum UVP ~',
    roi_disclaimer: 'UVP orientierend. Marge auf aktuellen Einkaufspreis berechnet.',
    urgency_stock_low: '⚡ Geringer Bestand', urgency_hot: '🔥 Sehr gefragt', urgency_trending: '📈 Trend',
    search_placeholder: 'Modell suchen... (z.B. Lawrence, Bergman)',
    search_empty: 'Keine Ergebnisse für',
    tab_all: 'Alle',
    why_eyebrow: 'Die Marke, die mit Ihnen arbeitet',
    why_h2_a: 'Mehr als', why_h2_b: ' nur Brillen', why_h2_c: '.',
    why_sub: 'Wir sind eine aufstrebende Marke, die ihren Ruf aufbaut, indem sie sich um jedes Geschäft kümmert, das uns wählt. Kein Spielen gegen Sie, keine Zwischenhändler.',
    why_1_t: 'Kein Mindestbestellwert. Keine Komplikationen.', why_1_d: 'Kein Mindestbestellwert pro Modell. Bestellen Sie, was Sie brauchen. Auswählen, schreiben und fertig.',
    why_2_t: 'Bewährte Bestseller + Defektgarantie', why_2_d: 'Unsere Designs werden durch echte Verkaufsdaten validiert. Bei Fertigungsdefekten tauschen wir ohne Rückfragen aus.',
    why_3_t: 'Digitale Unterstützung für Ihr Geschäft', why_3_d: 'Wir helfen mit Social-Media-Inhalten, geolokalisierten Werbekampagnen in Ihrer Postleitzahl und fertigen Bildmaterialien.',
    why_4_t: 'Wir konkurrieren nicht mit unseren Kunden', why_4_d: 'Keine aggressiven Online-Rabatte, kein Direktverkauf auf Ihren Kanälen. Ihre Marge gehört Ihnen. Wir schützen sie.',
    why_presente: 'Internationale Präsenz',
    why_presente_d: 'Vertrieb in Spanien, Frankreich, Portugal, Deutschland und Schwellenmärkten über lokale Händler.',
    why_faire: 'Auch auf Faire',
    lead_title: 'Ein Schritt vor dem Senden',
    lead_sub: 'Hinterlassen Sie Ihre Daten und wir bestätigen Verfügbarkeit und Konditionen. Unverbindlich.',
    lead_name: 'Ihr Name',
    lead_store: 'Name Ihres Geschäfts / Ihrer Optik',
    lead_email: 'Kontakt-E-Mail',
    lead_submit_wa: 'Weiter zu WhatsApp →',
    lead_submit_email: 'Weiter per E-Mail →',
    lead_skip: 'Diesen Schritt überspringen',
    lead_note: 'Ihre Daten werden nur zur Auftragsabwicklung verwendet. Kein Spam.',
    qv_colors: 'Verfügbare Farben', qv_sku: 'Referenz', qv_collection: 'Kollektion',
    qv_shape: 'Form', qv_rrp: 'Empfohlener VK', qv_close: 'Schließen', qv_add: 'Zur Bestellung hinzufügen', qv_added: 'Hinzugefügt',
    nav_badge: 'Trade Direct',
    nav_badge_sub: 'Auswählen und direkt bestellen · ohne Registrierung',
    new_eyebrow: '✦ Neuheiten SS26',
    new_h2_a: 'Frisch', new_h2_b: 'eingetroffen', new_h2_c: '.',
    new_sub: 'Erste Stücke verfügbar. Bestellen Sie, bevor sie ausverkauft sind.',
    new_show_more: 'Mehr Modelle anzeigen', new_show_less: 'Weniger anzeigen',
    new_badge: 'Neu',
    progress_browse: 'Stöbern', progress_select: 'Auswählen', progress_send: 'Bestellung senden',
    toast_added: 'zur Bestellung hinzugefügt',
    filters_btn: 'Filtern', filters_title: 'Filter',
    share_btn: 'Auswahl teilen', share_copied: 'Link kopiert!',
    acetato_premium: 'Premium',
    latam_hint: 'Ihre Bestellung geht an Minuë Lateinamerika',
    latam_badge: 'LATAM',
    region_latam_desc: 'Kolumbien · Mexiko · Chile · Argentinien',
    col_show_all: 'Alle Modelle anzeigen',
    col_collapse: 'Einklappen',
    col_models: 'Modelle',
    col_expand_hint: 'Zum Erkunden klicken',
    tier_best: 'Meistgewählt',
    ss26_banner: '🌿  SS26 Saison offen  ·  Neue Modelle verfügbar  ·  Begrenzter Bestand',
    faq_eyebrow: 'Häufige Fragen', faq_h2: 'Was Retailer meistens fragen',
    faq_q1: 'Gibt es eine Mindestbestellmenge?', faq_a1: 'Nein. Ab 10 Stück verbessern sich die Preise erheblich. Siehe Preistabelle.',
    faq_q2: 'Wie funktioniert diese Plattform?', faq_a2: 'Dies ist ein privater B2B-Katalog, kein Online-Shop. Modelle auswählen, in den Warenkorb legen und Anfrage per WhatsApp oder E-Mail senden. Bestätigung innerhalb von 24h.',
    faq_q3: 'Wie sind die Lieferzeiten?', faq_a3: 'Spanien: 2–4 Werktage. Europa: 4–7 Werktage. Lateinamerika: 10–15 Werktage über Minuë Latam.',
    faq_q4: 'Was beinhaltet das Display?', faq_a4: 'Ein kompakter Tischaufsteller für 5 Fassungen. Bewusst klein gehalten: weniger Platzbedarf und keine Reizüberflutung für den Kunden. Ab 20 Stück kostenlos inklusive.',
    faq_q5: 'Ist Verpackung inklusive?', faq_a5: 'Ja. Jede Fassung kommt mit Box, Hartschale, Mikrofasertuch, Technik-Karte und CE+UV400-Aufkleber.',
    faq_q6: 'Sind sie auf Faire erhältlich?', faq_a6: 'Ja. Auf Faire Wholesale "Minuë Opticians" suchen.',
    faq_q7: 'Welche Garantie haben die Produkte?', faq_a7: '2 Jahre Herstellergarantie. Fabrikfehler werden kostenlos ersetzt.',
  },
  pt: {
    nav_contact: 'Contacto', nav_catalog: 'Catálogo', nav_rates: 'Preços', nav_order: 'Pedido', nav_pdf: 'PDF', nav_faq: 'FAQ',
    hdr_eyebrow: 'B2B Wholesale · SS26',
    hdr_h1_a: 'Explore, selecione', hdr_h1_b: 'e faça', hdr_h1_c: 'o seu pedido.',
    hdr_sub: 'Navegue pelo nosso catálogo, adicione os modelos que lhe interessam e envie-nos a sua seleção. Preço por volume: quanto mais unidades, menor o preço unitário.',
    hdr_chip_top: 'Mais vendidos', hdr_chip_rates: 'Ver preços por volume',
    banner_expositor: 'Expositores incluídos a partir de 20 unidades — sem custos adicionais',
    bar_your_tier: 'O seu escalão', bar_empty: 'Sem unidades ainda — adicione produtos para ver o seu preço.',
    bar_missing_a: 'Faltam', bar_missing_b: 'uds para descer para', bar_rate_btn: 'Ver tabela',
    top_eyebrow: '★ Mais vendidos SS26',
    top_h2_month_pre: 'Os modelos que mais rodam em', top_h2_c: '.',
    top_sub: 'Ordenados por rotação real nos nossos distribuidores atuais.',
    filter_color: 'Cor', filter_shape: 'Forma', filter_clear: 'limpar',
    col_eyebrow: 'Coleção',
    col_essential_tag: 'A base do sortido. Formas atemporais, acetato standard.',
    col_icons_tag: 'Designs reconhecíveis com personalidade. Detalhes premium.',
    col_acetato_tag: 'Monturas artesanales de alta gama. Para el cliente más exigente.',
    empty_filter_t: 'Sem modelos com este filtro',
    empty_filter_d: 'Tente alargar a seleção.',
    pkg_eyebrow: 'Packaging', pkg_h2_a: 'Pronto para', pkg_h2_b: 'vitrine', pkg_h2_c: '.',
    pkg_sub: 'Cada armação chega pronta para exibir. Sem reembalar, sem perder tempo.',
    pkg1_t: 'Packaging completo incluído',
    pkg1_d: 'Cada armação inclui: caixa de apresentação com logo, estojo rígido, pano de microfibra, cartão com especificações técnicas e autocolante CE + UV400. Pronto para o cliente final.',
    pkg_contents_label: 'Em cada caixa',
    pkg_item1: 'Caixa de apresentação com logo',
    pkg_item2: 'Estojo rígido individual',
    pkg_item3: 'Pano de microfibra',
    pkg_item4: 'Cartão com especificações técnicas',
    pkg_item5: 'Autocolante CE · UV400',
    tech_eyebrow: 'Especificações técnicas',
    tech_h2: 'Qualidade certificada',
    tech_sub: 'Todos os modelos Minuë cumprem a regulamentação europeia de óculos de sol.',
    tech_uv: 'Proteção UV400', tech_uv_d: 'Filtragem total UVA e UVB até 400nm. Máxima proteção disponível.',
    tech_cat: 'Categoria 3', tech_cat_d: 'Lentes de alta filtragem para uso exterior com sol intenso.',
    tech_ce: 'Certificado CE', tech_ce_d: 'Conformidade EN ISO 12312-1. Aprovado para venda em toda a UE.',
    tech_pol: 'Lentes polarizadas', tech_pol_d: 'Elimina reflexos e encandeamentos.',
    tech_impact: 'Resistência ao impacto', tech_impact_d: 'Testes ISO aprovados. Hastes com alma de aço na coleção Acetato.',
    tech_drop: 'Drop Ball Test', tech_drop_d: 'Teste Drop Ball EN ISO 12312-1 aprovado.',
    tech_fod: 'FOD — Sem defeitos', tech_fod_d: 'Controlo de qualidade individual. Cada armação inspecionada e aprovada.',
    pkg2_t: 'Proteção premium',
    pkg2_d: 'Cada modelo em saco anti-riscos, bubble interno e caixa mestra reforçada. Zero danos em trânsito.',
    pkg3_t: 'Display-ready',
    pkg3_d: 'Etiquetado por modelo e cor. Os expositores incluídos no pedido chegam montados e prontos.',
    cta_eyebrow: 'Preços por volume',
    cta_h3_a: 'Mais designs,', cta_h3_b: 'melhor preço', cta_h3_c: '.', cta_h3_d: 'Desde 17,90€/ud em pedidos grandes.',
    cta_sub: 'Expositores grátis a partir de 20 uds · Envio grátis +20 uds · 3% pronto pagamento (plano 2 pagamentos).',
    cta_btn: 'Ver tabela completa',
    ft_contact: 'Contacto', ft_conditions: 'Condições',
    ft_cond1: 'Desde 17,90€/ud (40+ uds)', ft_cond2: 'PVP recomendado 55–60€',
    ft_cond3: 'Envio grátis +20 uds', ft_cond4: '3% desc. pronto pagamento',
    ft_copyright: '© 2026 Minuë Opticians — Catálogo Wholesale SS26',
    ft_tagline: 'Um catálogo. Um minueto.',
    panel_eyebrow: 'Pedido', panel_h3: 'A minha seleção',
    panel_empty_t: 'Ainda vazio', panel_empty_d: 'Adicione os modelos que lhe interessam para nos enviar o seu pedido.',
    panel_tier: 'Escalão atual', panel_price: 'Preço/ud', panel_consult: 'Consultar',
    panel_add_more_a: 'Adicione mais', panel_add_more_b: 'uds →', panel_savings: 'poupança',
    panel_total: 'Total', panel_units: 'uds', panel_free_ship: '+ envio grátis',
    panel_region_label: 'Onde fica a sua loja?',
    panel_region_hint_default: 'O seu pedido é enviado para a Minuë Opticians.',
    panel_region_hint_dist: 'O seu pedido é enviado ao nosso distribuidor',
    panel_wa: 'Enviar por WhatsApp', panel_email: 'Enviar por email',
    panel_disclaimer: 'Não é uma compra. É um pedido — confirmamos stock e prazos em menos de 24h.',
    panel_no_pay: '🔓 Não precisa de pagar agora',
    panel_no_pay_sub: 'Envie a sua seleção e confirmamos disponibilidade, preço final e prazos antes de qualquer pagamento.',
    panel_mi_pedido: 'O meu pedido', panel_remove: 'eliminar',
    panel_added: 'Adicionado', panel_add: 'Adicionar',
    modal_eyebrow: 'Preços SS26',
    modal_h2_a: 'Preço por', modal_h2_b: 'volume', modal_h2_c: ' — quanto mais pedir, menos paga.',
    modal_your_tier: 'O seu escalão',
    modal_payments: 'Pagamentos:', modal_expositor: 'Expositor:', modal_free_ship: '✓ Envio grátis',
    modal_plus60_label: '+60 uds', modal_plus60_t: 'Condições especiais',
    modal_plus60_d: 'Contacte-nos diretamente ou escreva para',
    modal_early_t: 'Pronto pagamento', modal_early_d: '3% de desconto adicional em planos de 2 pagamentos se pagar à entrega.',
    modal_rrp_t: 'PVP recomendado', modal_rrp_d: 'Entre 55€ e 60€ cliente final. Margem bruta média 67%.',
    modal_ship_t: 'Envio', modal_ship_d: 'Grátis a partir de 20 unidades. Custo conforme destino abaixo desse escalão.',
    modal_footer: 'Preços em euros, IVA não incluído. Tarifário válido para a época SS26.',
    order_greeting: 'Olá, gostaria de fazer um pedido:',
    order_tier: 'Escalão', order_total_line: 'Total',
    order_plus60: 'Total: {n} uds (escalão +60, preço a confirmar)',
    order_closing: 'Obrigado',
    shape_round: 'Redonda', shape_oval: 'Oval', shape_square: 'Quadrada',
    shape_rectangular: 'Retangular', shape_cateye: 'Cat-eye', shape_panto: 'Panto',
    shape_geometric: 'Geométrica',
    color_brown: 'Castanho', color_black: 'Preto', color_green: 'Verde', color_gold: 'Dourado',
    color_pink: 'Rosa', color_beige: 'Bege', color_gray: 'Cinza', color_carey: 'Tartaruga',
    hint_by_volume: 'por volume',
    pvp_label: 'PVP rec.',
    margin_label: 'Margem',
    from_label: 'desde',
    most_popular: 'Mais popular',
    roi_title: 'Rentabilidade estimada',
    roi_revenue: 'Receitas',
    roi_margin: 'Margem bruta',
    roi_sell_at: 'Vendendo a PVP ~',
    roi_disclaimer: 'PVP orientativo. Margem calculada sobre o preço de custo atual.',
    urgency_stock_low: '⚡ Poucas unidades', urgency_hot: '🔥 Muito procurado', urgency_trending: '📈 Tendência',
    search_placeholder: 'Pesquisar modelo... (ex. Lawrence, Bergman)',
    search_empty: 'Sem resultados para',
    tab_all: 'Todos',
    why_eyebrow: 'A marca que trabalha consigo',
    why_h2_a: 'Mais do que', why_h2_b: ' óculos', why_h2_c: '.',
    why_sub: 'Somos uma marca emergente que constrói a sua reputação cuidando de cada loja que nos escolhe. Sem jogar contra si, sem intermediários.',
    why_1_t: 'Sem mínimos. Sem complicações.', why_1_d: 'Sem pedido mínimo por modelo. Escolha o que precisa, nas quantidades que fazem sentido. Selecione, escreva-nos e recebe na sua loja.',
    why_2_t: 'Modelos que rodam + trocas cobertas', why_2_d: 'Os nossos designs são validados por dados reais de rotação. Se alguma unidade tiver defeito de fábrica, trocamos sem perguntas.',
    why_3_t: 'Apoio digital para o seu negócio', why_3_d: 'Ajudamos com conteúdo para redes sociais, campanhas de anúncios geolocalizadas no seu código postal e materiais visuais prontos a usar.',
    why_4_t: 'Não competimos com os nossos clientes', why_4_d: 'Sem descontos agressivos online, sem venda direta ao público nos seus canais. A sua margem é sua. Protegemo-la.',
    why_presente: 'Presença internacional',
    why_presente_d: 'Distribuição em Espanha, França, Portugal, Alemanha e mercados emergentes através de distribuidores locais.',
    why_faire: 'Também na Faire',
    lead_title: 'Um passo antes de enviar',
    lead_sub: 'Deixe os seus dados e confirmamos disponibilidade e condições. Sem compromisso.',
    lead_name: 'O seu nome',
    lead_store: 'Nome da sua loja / ótica',
    lead_email: 'Email de contacto',
    lead_submit_wa: 'Continuar para WhatsApp →',
    lead_submit_email: 'Continuar para email →',
    lead_skip: 'Ignorar este passo',
    lead_note: 'Os seus dados são usados apenas para gerir o seu pedido. Nunca spam.',
    qv_colors: 'Cores disponíveis', qv_sku: 'Referência', qv_collection: 'Coleção',
    qv_shape: 'Forma', qv_rrp: 'PVP recomendado', qv_close: 'Fechar', qv_add: 'Adicionar ao pedido', qv_added: 'Adicionado',
    nav_badge: 'Trade Direct',
    nav_badge_sub: 'Seleciona e pede direto · sem registo',
    new_eyebrow: '✦ Novidades SS26',
    new_h2_a: 'Acabados de', new_h2_b: 'chegar', new_h2_c: '.',
    new_sub: 'Primeiras unidades disponíveis. Encomende antes de esgotar.',
    new_show_more: 'Ver mais modelos', new_show_less: 'Ver menos',
    new_badge: 'Novo',
    progress_browse: 'A explorar', progress_select: 'A selecionar', progress_send: 'A enviar pedido',
    toast_added: 'adicionado ao pedido',
    filters_btn: 'Filtrar', filters_title: 'Filtros',
    share_btn: 'Partilhar seleção', share_copied: 'Link copiado!',
    acetato_premium: 'Premium',
    latam_hint: 'O seu pedido vai para a Minuë América Latina',
    latam_badge: 'LATAM',
    region_latam_desc: 'Colômbia · México · Chile · Argentina e mais',
    col_show_all: 'Ver todos os modelos',
    col_collapse: 'Recolher',
    col_models: 'modelos',
    col_expand_hint: 'Clique para explorar',
    tier_best: 'Mais escolhido',
    ss26_banner: '🌿  Temporada SS26 aberta  ·  Novos modelos disponíveis  ·  Stock limitado',
    faq_eyebrow: 'Perguntas frequentes', faq_h2: 'O que os retailers costumam perguntar',
    faq_q1: 'Qual é o pedido mínimo?', faq_a1: 'Não há pedido mínimo. A partir de 10 unidades os preços melhoram significativamente.',
    faq_q2: 'Como funciona esta plataforma?', faq_a2: 'É um catálogo B2B privado, não uma loja online. Selecione os modelos, adicione ao carrinho e envie-nos o pedido por WhatsApp ou email. Confirmamos stock e preços em menos de 24h.',
    faq_q3: 'Quais são os prazos de entrega?', faq_a3: 'Espanha: 2–4 dias úteis. Europa: 4–7 dias úteis. América Latina: 10–15 dias via Minuë Latam.',
    faq_q4: 'O que inclui o expositor?', faq_a4: 'Um expositor de balcão compacto, pensado para 5 armações. Intencionalmente pequeno: ocupa menos espaço e evita saturar o cliente com demasiadas opções. Incluído sem custo a partir de 20 unidades.',
    faq_q5: 'As armações incluem embalagem?', faq_a5: 'Sim. Cada armação inclui caixa, estojo rígido, pano de microfibra, ficha técnica e autocolante CE+UV400.',
    faq_q6: 'Estão disponíveis no Faire?', faq_a6: 'Sim. Pesquise "Minuë Opticians" no Faire Wholesale.',
    faq_q7: 'Que garantia têm os produtos?', faq_a7: '2 anos de garantia do fabricante. Defeitos de fábrica substituídos sem custos.',
  },
};

function detectLang() {
  if (typeof navigator === 'undefined') return 'es';
  const l = (navigator.language || 'es').toLowerCase().slice(0, 2);
  return ['es', 'fr', 'en', 'de', 'pt'].includes(l) ? l : 'es';
}

// ============================================================
// DISTRIBUIDORES — routing del pedido según región
// ⚠️ Ale: actualiza los datos reales de Agent Sud (Marc)
// ============================================================
const DISTRIBUTORS = {
  fr: {
    name: 'MPM Diffusion',
    contact: 'Pierre',
    whatsapp: '33677166421',
    email: 'mpm.diffusion@outlook.fr',
  },
  latam: {
    name: 'Minuë Opticians Latam',
    contact: '',
    whatsapp: '573227701800',
    email: 'hola@minueopticians.co',
    flag: '🌎',
  },
  default: {
    name: 'Minuë Opticians',
    contact: '',
    whatsapp: '34661018380',
    email: 'hola@minueopticians.com',
  },
};

const REGIONS = [
  { id: 'es',    flag: '🇪🇸', distributor: 'default',
    label: { es: 'España', fr: 'Espagne', en: 'Spain', de: 'Spanien', pt: 'Espanha' } },
  { id: 'latam', flag: '🌎', distributor: 'latam',
    label: { es: 'Latinoamérica', fr: 'Amérique latine', en: 'Latin America', de: 'Lateinamerika', pt: 'América Latina' },
    esOnly: false },
  { id: 'fr',    flag: '🇫🇷', distributor: 'fr',
    label: { es: 'Francia', fr: 'France', en: 'France', de: 'Frankreich', pt: 'França' } },
  { id: 'pt',    flag: '🇵🇹', distributor: 'default',
    label: { es: 'Portugal', fr: 'Portugal', en: 'Portugal', de: 'Portugal', pt: 'Portugal' } },
  { id: 'de',    flag: '🇩🇪', distributor: 'default',
    label: { es: 'Alemania', fr: 'Allemagne', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' } },
  { id: 'intl',  flag: '🌍', distributor: 'default',
    label: { es: 'Otro país', fr: 'Autre pays', en: 'Other country', de: 'Anderes Land', pt: 'Outro país' } },
];

function detectRegion(lang) {
  const map = { fr: 'fr', es: 'es', pt: 'pt', de: 'de', en: 'intl' };
  return map[lang] || 'intl';
}

function getDistributor(regionId) {
  const r = REGIONS.find(x => x.id === regionId);
  if (!r) return DISTRIBUTORS.default;
  return DISTRIBUTORS[r.distributor] || DISTRIBUTORS.default;
}

// ============================================================
// Catálogo — los shapes asignados por criterio estético.
// ⚠️ Ale: revisa y ajusta si algún modelo no cuadra.
// ============================================================
const PRODUCTS = [
  // ── ICONS — cada variante de color es su propia entrada, orden por ventas ─

  // Lawrence: 526 uds total — mayor vendedor Icons
  { id:23,  name:"Lawrence Guiza",    col:"Icons", shape:"square", colors:["miel","dorado"],   rank:9,  img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1776278426/fvfdcrfdwed_tkuq62.webp" },
  { id:123, name:"Lawrence Velvet",   col:"Icons", shape:"square", colors:["burdeos"],          rank:50, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1777237096/IMG_5850_1296x_goovpe.webp" },
  { id:124, name:"Lawrence Carey",    col:"Icons", shape:"square", colors:["carey"],            rank:51, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777237097/IMG_0266_1296x_rucknr.webp" },
  { id:125, name:"Lawrence Bay",      col:"Icons", shape:"square", colors:["azul"],             rank:52, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1777237096/Miproyecto_12_1512x_epy8bc.webp" },
  { id:126, name:"Lawrence Caramel",  col:"Icons", shape:"square", colors:["caramelo"],         rank:53, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1777237095/Miproyecto_11_900x_xuv5q1.webp" },
  { id:127, name:"Lawrence Black",    col:"Icons", shape:"square", colors:["negro"],            rank:54, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1776278426/fvfdcrfdwed_tkuq62.webp" },

  // Lamarr: 495 uds total
  { id:43,  name:"Lamarr Carbon Mate", col:"Icons", shape:"cateye", urgency:"hot", colors:["negro","carbono"], rank:3,  img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1777235608/IMG_4646_1080x_w3jhp7.webp" },
  { id:130, name:"Lamarr Louvre",      col:"Icons", shape:"cateye",               colors:["beige","nude"],    rank:55, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776277706/LAMARRBIC_900x_nuvcqj.webp" },
  { id:131, name:"Lamarr Carey",       col:"Icons", shape:"cateye",               colors:["carey"],           rank:56, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235607/IMG_4649_1080x_wxyeia.webp" },
  { id:132, name:"Lamarr Dark",        col:"Icons", shape:"cateye",               colors:["marrón"],          rank:57, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235608/IMG_3772_1080x_rmz7kx.webp" },

  // Loren: 455 uds total (tiene imágenes individuales)
  { id:24,  name:"Loren Carey",  col:"Icons", shape:"cateye", colors:["carey"],           rank:13, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986730/LORENCAREY_1728x_edxhjx.webp" },
  { id:96,  name:"Loren Toffee", col:"Icons", shape:"cateye", colors:["caramelo","marrón"],rank:21, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986730/LORENTOFFEEMINUEWEB_1728x_oxyoj1.webp" },
  { id:97,  name:"Loren Black",  col:"Icons", shape:"cateye", colors:["negro"],           rank:22, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986729/IMG_8167_1296x_oqut39.webp" },
  { id:95,  name:"Loren Cream",  col:"Icons", shape:"cateye", colors:["crema","beige"],   rank:23, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986729/IMG_5845_1296x_egicjl.webp" },

  // Berry: 332 uds total
  { id:30,  name:"Berry Tea",         col:"Icons", shape:"round", urgency:"trending", colors:["marrón","cálido"],  rank:10, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1776278629/IMG_0263_720x_uln010.webp" },
  { id:140, name:"Berry Carbon",      col:"Icons", shape:"round",                    colors:["negro","carbono"],   rank:58, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1776278629/IMG_0263_720x_uln010.webp" },
  { id:141, name:"Berry Navy Blue",   col:"Icons", shape:"round",                    colors:["azul"],              rank:59, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1776278629/IMG_0263_720x_uln010.webp" },
  { id:142, name:"Berry Brown Carey", col:"Icons", shape:"round",                    colors:["marrón","carey"],    rank:60, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1776278629/IMG_0263_720x_uln010.webp" },
  { id:143, name:"Berry Leopard",     col:"Icons", shape:"round",                    colors:["marrón","negro"],    rank:61, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1776278629/IMG_0263_720x_uln010.webp" },

  // Makey: 300 uds (sin imagen)
  { id:38,  name:"Makey Carey",        col:"Icons", shape:"rectangular", colors:["carey"],       rank:24, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231858/MAKEYCAREYWEB_1080x_ncdvtb.webp" },
  { id:150, name:"Makey Black",        col:"Icons", shape:"rectangular", colors:["negro"],        rank:62, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231883/MAKEYBLACKWEB_1080x_ulaedl.webp" },
  { id:151, name:"Makey Snow",         col:"Icons", shape:"rectangular", colors:["blanco"],       rank:63, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231858/MBLNEGW_1080x_pxxqdf.webp" },
  { id:152, name:"Makey Cherry",       col:"Icons", shape:"rectangular", colors:["rojo"],         rank:64, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231858/MAKEYREDWEB_1080x_qvpsfw.webp" },
  { id:153, name:"Makey Red Black",    col:"Icons", shape:"rectangular", colors:["rojo","negro"], rank:65, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231858/M2_1080x_sjyy1u.webp" },

  // Aretha: 220 uds (sin imagen — Roses descatalogado)
  { id:40,  name:"Aretha Carey", col:"Icons", shape:"round", colors:["carey"], rank:25, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232755/IMG_8156_1080x_akqlyh.webp" },
  { id:160, name:"Aretha Black", col:"Icons", shape:"round", colors:["negro"], rank:67, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232755/IMG_8160_1080x_tvssen.webp" },
  { id:223, name:"Aretha Rosse", col:"Icons", shape:"round", colors:["rosa"],  rank:68, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232754/IMG_8147_1080x_pjprsu.webp" },

  // Ziyi: ~200 uds (sin imagen — nombres con color primero en CSV)
  { id:42,  name:"Ziyi Mandarina", col:"Icons", shape:"square", colors:["naranja"],  rank:26, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232015/IMG_5842_1512x_xgnwe0.webp" },
  { id:161, name:"Ziyi Ágata",     col:"Icons", shape:"square", colors:["verde"],    rank:68, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232015/IMG_5839_1080x_c2fyio.webp" },
  { id:162, name:"Ziyi Ámbar",     col:"Icons", shape:"square", colors:["ámbar"],   rank:69, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232014/IMG_5840_1080x_bzjtbw.webp" },
  { id:163, name:"Ziyi Jaspe",     col:"Icons", shape:"square", colors:["marrón"],  rank:70, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232015/IMG_5844_1080x_pqlbnu.webp" },
  { id:164, name:"Ziyi Rosas",     col:"Icons", shape:"square", colors:["rosa"],    rank:71, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232015/IMG_0220_1080x_wf6yrs.webp" },

  // Karina: 158 uds (sin imagen)
  { id:41,  name:"Karina Jade",  col:"Icons", shape:"cateye", colors:["verde"],          rank:27, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232565/Minueoptician210222-010_1080x_cdjfa1.webp" },
  { id:170, name:"Karina Ruby",  col:"Icons", shape:"cateye", colors:["rojo"],           rank:72, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232564/Minueoptician210222-011_1080x_ys1csw.webp" },
  { id:171, name:"Karina Black", col:"Icons", shape:"cateye", colors:["negro"],          rank:73, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232564/IMG_4507_1080x_ukknez.webp" },
  { id:172, name:"Karina Copo",  col:"Icons", shape:"cateye", colors:["blanco","crema"], rank:74, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777232564/IMG_0235_1080x_cmzzxa.webp" },

  // Maclaine: 306 uds (TÉ MACLAINE 173 + BLACK 131, sin imagen)
  { id:25,  name:"Maclaine Tea",   col:"Icons", shape:"round", colors:["marrón","cálido"], rank:28, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233400/IMG_4503_1080x_qgdqtl.webp" },
  { id:180, name:"Maclaine Black", col:"Icons", shape:"round", colors:["negro"],            rank:75, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233400/IMG_4504_1080x_su4xqk.webp" },

  // Cleo: 127 uds (tiene imágenes)
  { id:28,  name:"Cleo Tea",   col:"Icons", shape:"cateye", colors:["marrón","cálido"], rank:14, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986729/IMG_2571_3f836e1a-078b-4f97-8b6e-0e6d0dbc30d7_1512x_qkwmvv.webp" },
  { id:98,  name:"Cleo Black",  col:"Icons", shape:"cateye", colors:["negro"],           rank:29, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986729/IMG_2568_0cdea3e3-91be-451b-97a0-301f495895da_1512x_pmfpjj.webp" },

  // Thurman: 147 uds (sin imagen — CARBONO THURMAN en CSV)
  { id:34,  name:"Thurman Carey",   col:"Essential", shape:"rectangular", colors:["carey"],          rank:30, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777230867/IMG_2556_1512x_tmkqfm.webp" },
  { id:181, name:"Thurman Cloud",   col:"Essential", shape:"rectangular", colors:["gris"],            rank:76, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777230867/IMG_3764_1512x_wku82m.webp" },
  { id:182, name:"Thurman Black",   col:"Essential", shape:"rectangular", colors:["negro"],           rank:77, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777230866/IMG_2553_1512x_wavffv.webp" },
  { id:184, name:"Thurman Ember",   col:"Essential", shape:"rectangular", colors:["naranja"],         rank:79, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777230866/IMG_5592_1512x_eaobsj.webp" },
  { id:183, name:"Thurman Caramel", col:"Essential", shape:"rectangular", colors:["caramelo"],        rank:78, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777230866/IMG_5625_1512x_pt0pwp.webp" },

  // Harlow: 117 uds (sin imagen)
  { id:37,  name:"Harlow Gold Green", col:"Icons", shape:"panto", colors:["dorado","verde"],  rank:31 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233643/Myproject-1_4_1080x_b7yaek.webp" },
  { id:185, name:"Harlow Gold Brown", col:"Icons", shape:"panto", colors:["dorado","marrón"], rank:80 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233642/IMG_0251_1080x_hsbmjz.webp" },
  { id:186, name:"Harlow Gold Black", col:"Icons", shape:"panto", colors:["dorado","negro"],  rank:81 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233642/Myproject-1_1080x_hbofmp.webp" },

  // Roberts: 100 uds (tiene imágenes)
  { id:33,  name:"Roberts Carrot", col:"Icons", shape:"square", colors:["naranja"],  rank:32, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986920/IMG_2576_900x_z2fnsz.webp" },
  { id:93,  name:"Roberts Peanut", col:"Icons", shape:"square", colors:["marrón"],   rank:33, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986920/IMG_2575_1296x_b9smpp.webp" },
  { id:94,  name:"Roberts Salmon", col:"Icons", shape:"square", colors:["rosa"],     rank:34, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986920/IMG_3775_1512x_iapwst.webp" },
  { id:220, name:"Roberts Black",  col:"Icons", shape:"square", colors:["negro"],    rank:35, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986920/IMG_3768_1512x_g5gmge.webp" },

  // Moore: 90 uds (tiene imagen)
  { id:27,  name:"Moore Black", col:"Icons", shape:"rectangular", colors:["negro"], rank:35, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776986730/MOOREBLACK_2048x_olbjuu.webp" },

  // Gugu: 73 uds (tiene imágenes)
  { id:26,  name:"Gugu Gold Green",       col:"Icons", shape:"geometric", urgency:"stock_low", colors:["dorado","verde"],         rank:4,  img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776277357/84_vxh8iz.png" },
  { id:64,  name:"Gugu Gold Brown Carey", col:"Icons", shape:"geometric",                      colors:["dorado","marrón","carey"],rank:36, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590220/196_mctzzt.png" },

  // Foster: 60 uds (sin imagen)
  { id:32,  name:"Foster Gold Brown",   col:"Icons", shape:"panto", colors:["dorado","marrón"], rank:37 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233952/IMG_0246_1080x_lecyyk.webp" },
  { id:187, name:"Foster Carbon Black", col:"Icons", shape:"panto", colors:["negro","carbono"], rank:82 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233953/IMG_0250_1080x_hgn78a.webp" },
  { id:188, name:"Foster Gold Grey",    col:"Icons", shape:"panto", colors:["dorado","gris"],   rank:83 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233953/IMG_0248_1080x_zfmzfl.webp" },

  // Lane: 135 uds (sin imagen)
  { id:36,  name:"Lane Grass",      col:"Essential", shape:"round", colors:["verde"],           rank:38, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231418/IMG_3769_1512x_a7rtfi.webp" },
  { id:190, name:"Lane Tea",        col:"Essential", shape:"round", colors:["marrón","cálido"],  rank:84, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231418/IMG_3771_1512x_nvruml.webp" },
  { id:191, name:"Lane Light Blue", col:"Essential", shape:"round", colors:["azul"],             rank:85, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231418/IMG_3766_1512x_wrb3vz.webp" },
  { id:192, name:"Lane Ámbar",      col:"Essential", shape:"round", colors:["ámbar"],            rank:86, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231418/IMG_3765_0ea890dd-6f6c-4337-99c9-739cea390cba_1512x_zg7bhj.webp" },
  { id:193, name:"Lane Black",      col:"Essential", shape:"round", colors:["negro"],            rank:87 },
  { id:194, name:"Lane Carey",      col:"Essential", shape:"round", colors:["carey"],            rank:88, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231418/IMG_3767_d9fd096e-b787-435c-9c15-18dd34ea86ce_1080x_wkewlp.webp" },
  { id:222, name:"Lane Opal",       col:"Essential", shape:"round", colors:["blanco","perla"],   rank:89, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777231418/IMG_3776_1512x_atccne.webp" },

  // Carrol: 53 uds (sin imagen)
  { id:39,  name:"Carrol Cedar", col:"Icons", shape:"oval", colors:["marrón","cedro"], rank:39 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235618/IMG_0254_1080x_ayvfd4.webp" },
  { id:195, name:"Carrol Rowan", col:"Icons", shape:"oval", colors:["gris"],           rank:89 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235617/IMG_0258_1080x_ueg64y.webp" },

  // Mirren: 50 uds (sin imagen — TÉ MIRREN en CSV)
  { id:35,  name:"Mirren Tea",   col:"Icons", shape:"oval", colors:["marrón","cálido"], rank:40 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233652/IMG_4510_1080x_nyfbyr.webp" },
  { id:196, name:"Mirren Carey", col:"Icons", shape:"oval", colors:["carey"],           rank:90 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233651/IMG_0212_1080x_bhj4hf.webp" },
  { id:197, name:"Mirren Black", col:"Icons", shape:"oval", colors:["negro"],           rank:91 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233643/IMG_4511_1080x_uhdghh.webp" },

  // Grant: 37 uds (sin imagen)
  { id:29,  name:"Grant Carey",   col:"Icons", shape:"rectangular", colors:["carey"],    rank:41 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233753/IMG_5612_1512x_beesly.webp" },
  { id:198, name:"Grant Caramel", col:"Icons", shape:"rectangular", colors:["caramelo"], rank:92 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233753/IMG_5613_1080x_qqay9v.webp" },
  { id:199, name:"Grant Black",   col:"Icons", shape:"rectangular", colors:["negro"],    rank:93 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777233752/IMG_5614_1512x_ocrzst.webp" },

  // Kerr: 16 uds (sin imagen)
  { id:44,  name:"Kerr Carey",      col:"Icons", shape:"rectangular", colors:["carey"],       rank:43 },
  { id:200, name:"Kerr Emerald",    col:"Icons", shape:"rectangular", colors:["verde"],        rank:94 },
  { id:201, name:"Kerr Black Gray", col:"Icons", shape:"rectangular", colors:["negro","gris"], rank:95 },

  // Stone: 13 uds (sin imagen)
  { id:31,  name:"Stone Gold Black", col:"Icons", shape:"square", colors:["dorado","negro"], rank:42 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235611/IMG_0231_1080x_houngo.webp" },
  { id:225, name:"Stone Gold Brown", col:"Icons", shape:"square", colors:["dorado","marrón"], rank:43, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235612/IMG_0217_1080x_lghewj.webp" },

  // ── ESSENTIAL ────────────────────────────────────────────────────────
  { id:1,  name:"Bergman Noire",       col:"Essential", shape:"rectangular", urgency:"stock_low", colors:["negro","carey"],  rank:46,  isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590223/221_oeycry.png" },
  { id:54, name:"Bergman Honey",       col:"Essential", shape:"rectangular",                      colors:["miel","cálido"],  rank:15, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590223/220_mutoia.png" },
  { id:3,  name:"Bergman Rust",        col:"Essential", shape:"rectangular",                      colors:["marrón","cálido"],rank:44, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590223/217_skjewv.png" },
  { id:55, name:"Bergman Carey Brown", col:"Essential", shape:"rectangular",                      colors:["carey","marrón"], rank:1, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590222/213_r9bzfx.png" },
  { id:56, name:"Bergman Carbon",      col:"Essential", shape:"rectangular",                      colors:["negro","carbono"],rank:46, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590222/211_mv2omz.png" },
  { id:57, name:"Bergman Brown",       col:"Essential", shape:"rectangular",                      colors:["marrón"],         rank:47, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590222/210_jnsxlo.png" },
  { id:62, name:"Bergman Carey",       col:"Essential", shape:"rectangular",                      colors:["carey"],          rank:48, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590221/199_roiwuk.png" },
  // Deneuve: 55 uds (sin imagen)
  { id:8,   name:"Deneuve Tea",   col:"Essential", shape:"cateye", colors:["marrón","cálido"],rank:49 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235619/4_1080x_tpnoai.webp" },
  { id:202, name:"Deneuve Carey", col:"Essential", shape:"cateye", colors:["carey"],          rank:96 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235618/5_1080x_a6mvkj.webp" },
  { id:203, name:"Deneuve Apple", col:"Essential", shape:"cateye", colors:["verde"],          rank:97 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235619/3_1512x_qlli1g.webp" },
  // Bacall: 40 uds (sin imagen)
  // Cooper II: 53 uds (sin imagen)
  { id:19,  name:"Cooper II Grass",     col:"Essential", shape:"round", colors:["verde"],   rank:49 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235612/IMG_5620_1080x_qgcmby.webp" },
  { id:207, name:"Cooper II Buttercup", col:"Essential", shape:"round", colors:["amarillo"],rank:101 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235613/IMG_5622_1512x_1_vdhrbl.webp" },
  { id:208, name:"Cooper II Sierra",    col:"Essential", shape:"round", colors:["marrón"],  rank:102 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235614/IMG_5616_1080x_rfydzw.webp" },
  { id:209, name:"Cooper II Caramel",     col:"Essential", shape:"round", colors:["caramelo"],   rank:103 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235616/IMG_5615_1080x_n9xtaq.webp" },
  { id:233, name:"Cooper II Tiger", col:"Essential", shape:"round", colors:["tigre","carey"], rank:113 },
  { id:210, name:"Cooper II Moonlight", col:"Essential", shape:"round", colors:["beige"],   rank:104 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235614/IMG_5619_1080x_ngaigy.webp" },
  { id:211, name:"Cooper II Havana",    col:"Essential", shape:"round", colors:["havana"],  rank:105 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235615/IMG_5618_1080x_qokuvs.webp" },
  // Hart: 37 uds
  { id:7,   name:"Hart Honey",  col:"Essential", shape:"square", colors:["miel","cálido"],  rank:51, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590199/72_jjyjef.png" },
  { id:83,  name:"Hart Carey",  col:"Essential", shape:"square", colors:["carey"],          rank:52, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590192/20_ovz0a0.png" },
  { id:86,  name:"Hart Sunset", col:"Essential", shape:"square", colors:["naranja","cálido"],rank:53, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590194/36_oxag8z.png" },
  // Roger: 36 uds (isNew SS26)
  { id:54,  name:"Roger Carey",  col:"Essential", shape:"rectangular", colors:["carey"],        rank:54, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590224/230_ybcxjk.png" },
  { id:55,  name:"Roger Velvet", col:"Essential", shape:"rectangular", colors:["burdeos"],      rank:55, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590224/229_puavtb.png" },
  { id:56,  name:"Roger Wine",   col:"Essential", shape:"rectangular", colors:["burdeos","rojo"],rank:56, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590224/227_xigzba.png" },
  // Bolden: rank 6 top pick
  { id:16,  name:"Bolden Wine",  col:"Essential", shape:"rectangular", colors:["burdeos"], rank:55 },
  { id:63,  name:"Bolden Oliva", col:"Essential", shape:"rectangular", colors:["verde"],         rank:57, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590220/195_qakpdg.png" },
  { id:66,  name:"Bolden Ebony", col:"Essential", shape:"rectangular", colors:["negro"],          rank:58, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590220/193_bjptue.png" },
  { id:65,  name:"Bolden Nude",  col:"Essential", shape:"rectangular", colors:["nude"],           rank:59, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590220/192_mvmgmk.png" },
  { id:60,  name:"Bolden Bruma", col:"Essential", shape:"rectangular", colors:["gris","neutro"],  rank:6, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590220/194_hwuk8l.png" },
  // Rainer: 20 uds
  { id:10,  name:"Rainer Mandarine", col:"Essential", shape:"round", colors:["naranja"], rank:61, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590208/116_z2owvq.png" },
  { id:74,  name:"Rainer Carey",     col:"Essential", shape:"round", colors:["carey"],   rank:62, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590208/115_xhcrlb.png" },
  // Arielle: rank 7 top pick
  { id:11,  name:"Arielle Dusty",  col:"Essential", shape:"oval", colors:["rosa","beige"],rank:7,  img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590207/105_wxiarw.png" },
  { id:78,  name:"Arielle Carey",  col:"Essential", shape:"oval", colors:["carey"],       rank:63, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590207/104_ijc9wd.png" },
  { id:82,  name:"Arielle Velvet", col:"Essential", shape:"oval", colors:["burdeos"],     rank:64, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590200/75_zjvevs.png" },
  // Blyth: 11 uds
  { id:18,  name:"Blyth Emerald", col:"Essential", shape:"rectangular", colors:["verde"], rank:65, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590210/124_a4teov.png" },
  { id:70,  name:"Blyth Carey",   col:"Essential", shape:"rectangular", colors:["carey"], rank:66, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590210/123_pucyjo.png" },
  // Hedy: rank 8 top pick
  { id:15,  name:"Hedy Guiza",  col:"Essential", shape:"round", colors:["miel","dorado"], rank:8,  img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590207/109_lmyt8j.png" },
  { id:87,  name:"Hedy Matcha", col:"Essential", shape:"round", colors:["verde"],          rank:67, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777238291/38_1080x_g67jni.webp" },
  { id:88,  name:"Hedy Carey",  col:"Essential", shape:"round", colors:["carey"],          rank:68, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590194/39_j5xr3i.png" },
  // Colette: 14 uds
  { id:14,  name:"Colette Burnt",  col:"Essential", shape:"cateye", colors:["naranja"], rank:69, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590209/119_twux0d.png" },
  { id:73,  name:"Colette Jungle", col:"Essential", shape:"cateye", colors:["verde"],   rank:70, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590209/118_qjnnlr.png" },
  { id:89,  name:"Colette Cocoa",  col:"Essential", shape:"cateye", colors:["marrón"],  rank:71, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590195/44_xyxshu.png" },
  // Dover: 15 uds
  { id:12,  name:"Dover Hunter Blend", col:"Essential", shape:"rectangular", colors:["verde"],          rank:72, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590196/47_lzlfga.png" },
  { id:90,  name:"Dover Tea",          col:"Essential", shape:"rectangular", colors:["marrón","cálido"],rank:73, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590197/48_ocj5up.png" },
  { id:91,  name:"Dover Shadow",       col:"Essential", shape:"rectangular", colors:["gris"],           rank:74, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590197/48_ocj5up.png" },
  // Hazel: 13 uds
  { id:67,  name:"Hazel Petal", col:"Essential", shape:"oval", colors:["rosa"],  rank:76, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777238423/50_1080x_avjg1r.webp" },
  // Tura: 12 uds
  { id:4,   name:"Tura Guiza", col:"Essential", shape:"square", colors:["miel","dorado"],rank:77, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590207/103_ze0plj.png" },
  { id:75,  name:"Tura Nude",  col:"Essential", shape:"square", colors:["nude"],         rank:78, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590207/108_ccrl79.png" },
  { id:76,  name:"Tura Noir",  col:"Essential", shape:"square", colors:["negro"],        rank:79, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590207/106_orwzvv.png" },
  { id:77,  name:"Tura Carey", col:"Essential", shape:"square", colors:["carey"],        rank:80, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590207/107_ovzxrn.png" },
  // Vitti: nuevo SS26
  { id:2,   name:"Vitti Brown",       col:"Essential", shape:"cateye", colors:["marrón"],         rank:81, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590221/203_bvypll.png" },
  { id:212, name:"Vitti Velvet",      col:"Essential", shape:"cateye", colors:["burdeos"],         rank:82, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590221/201_vzqsat.png" },
  { id:213, name:"Vitti Caramel",     col:"Essential", shape:"cateye", colors:["caramelo"],        rank:83, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590221/202_gusxcv.png" },
  { id:214, name:"Vitti Brown Carey", col:"Essential", shape:"cateye", colors:["carey","marrón"],  rank:84, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590221/204_yuculq.png" },
  // Cardinale: nuevo SS26
  { id:5,   name:"Cardinale Carey", col:"Essential", shape:"panto", colors:["carey","verde","miel"],rank:85, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590222/208_kg1lxu.png" },
  { id:58,  name:"Cardinale Guiza", col:"Essential", shape:"panto", colors:["miel","dorado"],       rank:86, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590221/207_useou6.png" },
  { id:59,  name:"Cardinale Apple", col:"Essential", shape:"panto", colors:["verde"],               rank:87, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590221/206_p7m4so.png" },
  // Chastain: rank 5 top pick
  { id:20,  name:"Chastain Black",        col:"Essential", shape:"cateye", urgency:"trending", colors:["negro","carey","verde"],rank:5,  isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590223/216_tjup92.png" },
  { id:68,  name:"Chastain Carey",        col:"Essential", shape:"cateye",                     colors:["carey"],               rank:88, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590212/132_zild1l.png" },
  { id:69,  name:"Chastain Noire Violet", col:"Essential", shape:"cateye",                     colors:["negro","burdeos"],     rank:89, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235610/sadascas_1080x_asvwdj.webp" },
  { id:225, name:"Chastain Red Light", col:"Essential", shape:"cateye", colors:["rojo"], rank:90, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777235609/sa_1080x_siluhw.webp" },
  // Gardner: 3 uds
  { id:6,   name:"Gardner Carey", col:"Essential", shape:"round", colors:["carey"],  rank:90, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590206/102_awq6kg.png" },
  { id:79,  name:"Gardner Amber Doré", col:"Essential", shape:"round", colors:["ámbar"],  rank:91, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590206/100_kesd63.png" },
  { id:92,  name:"Gardner Black", col:"Essential", shape:"round", colors:["negro"],  rank:92, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590206/101_pg1660.png" },
  // Sin imagen
  { id:237, name:"Nova Black", col:"Essential", shape:"geometric", colors:["negro"], rank:117 },
  { id:17,  name:"Nova Ruby",       col:"Essential", shape:"geometric",   colors:["rojo","rubí"],   rank:93, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590217/172_e8julb.png" },
  { id:221, name:"Nova Jade",       col:"Essential", shape:"geometric",   colors:["verde","jade"],  rank:94, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590217/171_aavi3l.png" },
  { id:9,   name:"Totter Leaf",     col:"Essential", shape:"rectangular", colors:["verde"],           rank:95 },
  { id:217, name:"Totter Carey",    col:"Essential", shape:"rectangular", colors:["carey"],           rank:108 },

  // ── ACETATO ──────────────────────────────────────────────────────────
  { id:53,  name:"Hayek Olive",    col:"Acetato", shape:"square",      urgency:"hot", colors:["verde","oliva"],  rank:50,  img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590203/86_i09mqr.png" },
  { id:52,  name:"Leigh Chalk",    col:"Acetato", shape:"rectangular",               colors:["blanco"],          rank:16, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590208/112_pmpzcn.png" },
  { id:47,  name:"Arden Cocoa",    col:"Acetato", shape:"cateye",                    colors:["marrón"],          rank:11, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590211/122_ivwzqu.png" },
  { id:50,  name:"Novak Mocha",    col:"Acetato", shape:"square",                    colors:["moca","marrón"],   rank:12, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590203/92_txomis.png" },
  { id:224, name:"Chastain Olive",     col:"Essential", shape:"cateye", urgency:"trending", colors:["verde","oliva"], rank:2, isNew:true, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_900,q_auto,f_auto/v1777235610/saxaa_1080x_p0gxws.webp" },
  { id:81,  name:"Hayek Carey",    col:"Acetato", shape:"square",                    colors:["carey"],           rank:17, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590202/85_r9q8ec.png" },
  { id:71,  name:"Arden Carey",    col:"Acetato", shape:"cateye",                    colors:["carey"],           rank:18, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590209/121_wvm2wp.png" },
  { id:72,  name:"Arden Champagne",col:"Acetato", shape:"cateye",                    colors:["champán","dorado"],rank:19, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590209/120_s8exzo.png" },
  { id:80,  name:"Novak Carey",    col:"Acetato", shape:"square",                    colors:["carey"],           rank:20, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590203/91_yctpcq.png" },
  { id:84,  name:"Fonda Sepia",    col:"Acetato", shape:"square",                    colors:["marrón"],          rank:96, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590193/28_qoduia.png" },
  { id:46,  name:"Astor Green",    col:"Acetato", shape:"rectangular",               colors:["verde"],           rank:97, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590194/30_sm0o9h.png" },
  { id:85,  name:"Astor Bronce",   col:"Acetato", shape:"rectangular",               colors:["bronce"],          rank:98, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590194/34_w3ugnz.png" },
  { id:51,  name:"Ivy Felline",    col:"Acetato", shape:"oval",                      colors:["ámbar"],          rank:99, img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1776590208/113_ib6mfy.png" },
  { id:48,  name:"Bardot",         col:"Acetato", shape:"cateye",                    colors:["carey"],           rank:100 },
  { id:49,  name:"Juno",           col:"Acetato", shape:"round",                     colors:["negro"],           rank:101 },
  { id:45,  name:"Sienna",         col:"Acetato", shape:"square",                    colors:["marrón","negro"],  rank:102 },
  // ── Añadidos desde PDF SS26 ──────────────────────────────────────
  { id:228, name:"Baker Tea",          col:"Essential", shape:"rectangular", colors:["marrón","cálido"],  rank:108 },
  { id:229, name:"Baker Cloud",        col:"Essential", shape:"rectangular", colors:["gris","crema"],     rank:109 },
  { id:230, name:"Baker Mint",         col:"Essential", shape:"rectangular", colors:["verde","menta"],    rank:110 },
  { id:231, name:"Baker Black",        col:"Essential", shape:"rectangular", colors:["negro"],            rank:111 },
  { id:226, name:"Hart Black",         col:"Essential", shape:"square",      colors:["negro"],            rank:112 },
  { id:227, name:"Hedy Jara",          col:"Essential", shape:"round",       colors:["verde"],            rank:113 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777238292/39_1080x_ljvzuy.webp" },
  { id:233, name:"Tura Coffee",        col:"Essential", shape:"oval",        colors:["marrón","café"],    rank:115 },
  { id:234, name:"Tura Velvet",        col:"Essential", shape:"oval",        colors:["burdeos"],          rank:116 },
  { id:235, name:"Moore Kaffa",        col:"Icons",     shape:"rectangular", colors:["marrón","café"],    rank:117 },
  { id:236, name:"Hazel Carey",        col:"Essential", shape:"square",      colors:["carey"],            rank:118 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777238421/51_1080x_gdsyrw.webp" },
  { id:237, name:"Hazel Noir",         col:"Essential", shape:"square",      colors:["negro"],            rank:119 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777238421/52_1080x_wawued.webp" },
  { id:238, name:"Rainer Caramel",     col:"Essential", shape:"oval",        colors:["caramelo"],         rank:120 , img:"https://res.cloudinary.com/dekvzwn7b/image/upload/e_background_removal/w_800,q_auto,f_auto/v1777238348/9_1080x_ladhto.webp" },
  { id:239, name:"Cardinale Tea",      col:"Essential", shape:"oval",        colors:["marrón","cálido"],  rank:121 },
];

const SHAPES = [
  { id: 'round', tKey: 'shape_round' },
  { id: 'oval', tKey: 'shape_oval' },
  { id: 'square', tKey: 'shape_square' },
  { id: 'rectangular', tKey: 'shape_rectangular' },
  { id: 'cateye', tKey: 'shape_cateye' },
  { id: 'panto', tKey: 'shape_panto' },
  { id: 'geometric', tKey: 'shape_geometric' },
];

const COLOR_DOTS = {
  'marrón': '#6b4423', 'negro': '#1a1a1a', 'verde': '#18332f',
  'dorado': '#b8860b', 'rosa': '#d4a5a5', 'beige': '#d4c4a8',
  'gris': '#9ca3a0', 'carey': '#7a5c3a', 'cálido': '#c49a6c',
  'neutro': '#b8a594', 'rojo': '#a23e3e', 'miel': '#c49a2c',
  'burdeos': '#6b2737', 'caramelo': '#c48a3c', 'nude': '#d4b8a0',
  'ámbar': '#c49a1c', 'naranja': '#c4703c', 'azul': '#3c5a7a',
  'blanco': '#e8e0d4', 'champán': '#d4c48a', 'carbono': '#3c3c3c',
  'bronce': '#8a6c3c', 'sienna': '#a4603c', 'moca': '#7a5040',
  'havana': '#5a3820', 'cedro': '#6b4030', 'tigre': '#a45c1c',
  'amarillo': '#d4b83c', 'crema': '#e8d8c0',
};
const COLOR_FILTERS = [
  { id: 'marrón', tKey: 'color_brown' }, { id: 'negro', tKey: 'color_black' },
  { id: 'verde', tKey: 'color_green' }, { id: 'dorado', tKey: 'color_gold' },
  { id: 'rosa', tKey: 'color_pink' }, { id: 'beige', tKey: 'color_beige' },
  { id: 'gris', tKey: 'color_gray' }, { id: 'carey', tKey: 'color_carey' },
];

const COLLECTIONS = [
  { id: 'Essential', label: 'Essential', tagKey: 'col_essential_tag', rrp: 50, unitCost: null },
  { id: 'Icons',     label: 'Icons',     tagKey: 'col_icons_tag',     rrp: 50, unitCost: null },
  { id: 'Acetato',   label: 'Acetato',   tagKey: 'col_acetato_tag',   rrp: 69, unitCost: 25.95 },
];

const URGENCY_LABELS = { stock_low: 'urgency_stock_low', hot: 'urgency_hot', trending: 'urgency_trending' };
const URGENCY_COLORS = { stock_low: '#e85a00', hot: '#c41e1e', trending: '#b8860b' };

const TIERS = [
  { min: 1, max: 9, price: 22.90, label: '<10', payments: 'Pago único', expositor: '8,90€ opcional', freeShip: false },
  { min: 10, max: 19, price: 21.90, label: '10–19', payments: 'Pago único', expositor: '8,90€ opcional', freeShip: false },
  { min: 20, max: 29, price: 19.90, label: '20–29', payments: '2 pagos', expositor: '2 incluidos', freeShip: true, badge: 'Más elegido' },
  { min: 30, max: 39, price: 18.90, label: '30–39', payments: '2 pagos', expositor: '3 incluidos', freeShip: true },
  { min: 40, max: 60, price: 17.90, label: '40–60', payments: '2 pagos (15+45)', expositor: '3 incluidos', freeShip: true },
];


const RECENT_CLIENTS = [
  { name: 'Óptica Velázquez', city: 'Sevilla' },
  { name: 'Lunetterie du Marais', city: 'Paris' },
  { name: 'Óptica Central', city: 'Barcelona' },
  { name: 'Optique Cathédrale', city: 'Lyon' },
  { name: 'La Óptica de Eva', city: 'Madrid' },
  { name: 'Brillen Studio', city: 'Berlin' },
  { name: 'Ótica Lisboa Center', city: 'Lisboa' },
  { name: 'Óptica Mirador', city: 'Málaga' },
  { name: 'Lunetterie Saint-Jean', city: 'Bordeaux' },
  { name: 'Óptica Mar i Vent', city: 'Valencia' },
];

function getTier(units) {
  if (units <= 0) return null;
  if (units > 60) return { min: 61, max: Infinity, price: null, label: '+60', payments: 'Consultar', expositor: '—', freeShip: true };
  return TIERS.find(t => units >= t.min && units <= t.max);
}
function getNextTier(units) {
  if (units > 60) return null;
  const current = getTier(units);
  if (!current) return TIERS[0];
  const idx = TIERS.indexOf(current);
  return idx >= 0 && idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
}

// ============================================================
// Iconos
// ============================================================
const IconBag = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const IconDownload = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconClose = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconPlus = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconMinus = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconTrash = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1.5 14a2 2 0 0 1-2 2H8.5a2 2 0 0 1-2-2L5 6"/>
  </svg>
);
const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconWA = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);
const IconInfo = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const IconGlobe = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconChevron = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconGift = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);
const IconSunUp = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Rayos del sol */}
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="19.78" y1="4.22" x2="18.36" y2="5.64"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="19.78" y1="19.78" x2="18.36" y2="18.36"/>
    {/* Círculo del sol */}
    <circle cx="12" cy="12" r="4"/>
    {/* Flecha hacia arriba dentro/encima */}
    <polyline points="9 8 12 5 15 8"/>
    <line x1="12" y1="5" x2="12" y2="19"/>
  </svg>
);

// ============================================================
// App principal
// ============================================================
const MONTH_NAMES = {
  es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
  pt: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
};

// ── KineticText — letra a letra con stagger ──────────────────────────
function KineticText({ text, delay = 0 }) {
  if (!text) return null;
  return (
    <span style={{ display: 'inline' }}>
      {text.split('').map((ch, i) => (
        <span key={i} style={{
          display: 'inline-block',
          animation: 'mn-char-in 0.5s cubic-bezier(0.22,1,0.36,1) both',
          animationDelay: `${delay + i * 0.028}s`,
        }}>{ch === ' ' ? '\u00a0' : ch}</span>
      ))}
    </span>
  );
}

// ── CustomCursor — solo desktop ───────────────────────────────────────
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [expanded, setExpanded] = useState(false);
  const [isImg, setIsImg] = useState(false);
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      const target = e.target;
      setExpanded(!!(
        target.closest('.mn-card') || target.closest('.mn-btn') ||
        target.closest('.mn-pill') || target.closest('button') || target.closest('a')
      ));
      setIsImg(!!(target.tagName === 'IMG' || target.closest('.mn-card-img')));
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);
  const size = expanded ? (isImg ? 54 : 42) : 10;
  return (
    <div style={{
      position: 'fixed', zIndex: 9999, pointerEvents: 'none',
      mixBlendMode: 'multiply',
      left: pos.x, top: pos.y,
      transform: 'translate(-50%,-50%)',
      width: size, height: size, borderRadius: '50%',
      background: expanded ? 'rgba(24,51,47,0.07)' : 'rgba(24,51,47,0.75)',
      border: expanded ? '1.5px solid rgba(24,51,47,0.28)' : 'none',
      transition: 'width 0.2s cubic-bezier(0.25,0.46,0.45,0.94), height 0.2s cubic-bezier(0.25,0.46,0.45,0.94), background 0.15s',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {isImg && expanded && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(24,51,47,0.5)" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      )}
    </div>
  );
}

// ── FlyingItem — emoji vuela al carrito ───────────────────────────────
function FlyingItem({ item, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 600);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{
      position: 'fixed', zIndex: 9998, pointerEvents: 'none',
      left: item.x, top: item.y,
      width: 36, height: 36, borderRadius: 999,
      background: 'rgba(248,239,230,0.95)',
      border: '1px solid rgba(24,51,47,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16,
      animation: 'mn-fadein 0.1s ease-out both, mn-fadeout 0.4s 0.2s ease-in both',
    }}>🕶️</div>
  );
}

// ── generatePDF — abre ventana de impresión con pedido formateado ─────
function generatePDF({ cartItems, cartCount, cartTotal, unitPrice, currentTier, distributor, region, lang, t, discountPct, cost, gainEur, gainPct }) {
  const isLatam = region === 'latam';
  const contact = isLatam
    ? { name: 'Minuë Latam', address: 'CRA 19a 85 69, Bogotá, Colombia', phone: '+57 (322) 770-1800', email: 'hola@minueopticians.co', web: 'minueopticians.co' }
    : { name: 'Minuë Opticians', address: 'Calle Ardilla 13 Oficinas, 41010 Sevilla, Spain', phone: '+34 661 018 380', email: 'hola@minueopticians.com', web: 'minueopticians.com' };

  const date = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : lang === 'pt' ? 'pt-PT' : lang === 'en' ? 'en-GB' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  const orderRef = 'MN-' + Date.now().toString(36).toUpperCase().slice(-6);
  const totalCost = discountPct > 0 ? (cost * (1 - discountPct / 100)) : cost;

  const rows = cartItems.map(item => {
    const col = COLLECTIONS.find(c => c.id === item.col);
    const price = col?.unitCost ?? unitPrice ?? DISPLAY_PRICE;
    return `<tr>
      <td style="padding:8px 10px;border-bottom:1px solid #e8dfd8;font-size:12px;">${item.name}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e8dfd8;font-size:12px;text-align:center;">${item.col}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e8dfd8;font-size:12px;text-align:center;">${item.qty}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e8dfd8;font-size:12px;text-align:right;">${price.toFixed(2).replace('.',',')}€</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e8dfd8;font-size:12px;text-align:right;font-weight:600;">${(item.qty * price).toFixed(2).replace('.',',')}€</td>
    </tr>`;
  }).join('');

  const condiciones = {
    es: ['Este documento es una solicitud de pedido, no una factura.', 'El pedido estará sujeto a confirmación de stock por parte de Minuë.', 'El pago se realizará una vez confirmada la disponibilidad y los plazos de entrega.', currentTier?.payments ? `Condiciones de pago: ${currentTier.payments}.` : '', currentTier?.freeShip ? 'Envío incluido en este pedido.' : 'Gastos de envío a confirmar según destino.', currentTier?.expositor && currentTier.expositor !== '8,90€ opcional' ? `Expositor: ${currentTier.expositor}.` : ''].filter(Boolean),
    fr: ['Ce document est une demande de commande, pas une facture.', 'La commande sera soumise à confirmation de stock par Minuë.', 'Le paiement sera effectué après confirmation de disponibilité et des délais.', currentTier?.freeShip ? 'Livraison incluse dans cette commande.' : 'Frais de port à confirmer selon destination.'].filter(Boolean),
    en: ['This document is an order request, not an invoice.', 'The order will be subject to stock confirmation by Minuë.', 'Payment will be processed after availability and delivery time confirmation.', currentTier?.freeShip ? 'Shipping included in this order.' : 'Shipping costs to be confirmed based on destination.'].filter(Boolean),
    de: ['Dieses Dokument ist eine Bestellanfrage, keine Rechnung.', 'Die Bestellung bedarf der Lagerbestätigung durch Minuë.', 'Die Zahlung erfolgt nach Bestätigung der Verfügbarkeit und Lieferzeiten.', currentTier?.freeShip ? 'Versand in dieser Bestellung enthalten.' : 'Versandkosten je nach Ziel zu bestätigen.'].filter(Boolean),
    pt: ['Este documento é um pedido de encomenda, não uma fatura.', 'O pedido estará sujeito à confirmação de stock por parte da Minuë.', 'O pagamento será efetuado após confirmação de disponibilidade e prazos.', currentTier?.freeShip ? 'Envio incluído nesta encomenda.' : 'Custos de envio a confirmar conforme destino.'].filter(Boolean),
  };
  const conds = (condiciones[lang] || condiciones.es).map(c => `<li style="margin-bottom:4px;">${c}</li>`).join('');

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
  <title>Pedido Minuë — ${orderRef}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans',sans-serif;color:#18332f;background:#fff;padding:40px;}
    @media print{body{padding:0;}@page{margin:15mm 18mm;size:A4;}}
    .serif{font-family:'Cormorant Garamond',serif;}
    header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:24px;border-bottom:2px solid #18332f;margin-bottom:28px;}
    .logo-block h1{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;letter-spacing:-0.02em;color:#18332f;}
    .logo-block p{font-size:10px;letter-spacing:2px;text-transform:uppercase;opacity:0.5;margin-top:3px;}
    .meta{text-align:right;font-size:11px;line-height:1.7;opacity:0.65;}
    .meta strong{font-size:13px;opacity:1;color:#b8860b;}
    h2{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;margin-bottom:12px;letter-spacing:-0.01em;}
    table{width:100%;border-collapse:collapse;margin-bottom:28px;}
    thead th{padding:10px;background:#18332f;color:#f8efe6;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-align:left;}
    thead th:nth-child(3),thead th:nth-child(4),thead th:nth-child(5){text-align:center;}
    thead th:nth-child(4),thead th:nth-child(5){text-align:right;}
    .totals{display:flex;justify-content:flex-end;margin-bottom:28px;}
    .totals-box{width:260px;border:1px solid #18332f20;border-radius:4px;overflow:hidden;}
    .totals-row{display:flex;justify-content:space-between;padding:8px 14px;font-size:12px;border-bottom:1px solid #18332f10;}
    .totals-row:last-child{border-bottom:none;background:#18332f;color:#f8efe6;padding:12px 14px;}
    .totals-row:last-child span:last-child{font-size:18px;font-weight:700;font-family:'Cormorant Garamond',serif;}
    .gain-row{background:#b8860b10;display:flex;justify-content:space-between;padding:7px 14px;font-size:11px;color:#8a6000;}
    .conditions{background:#18332f05;border:1px solid #18332f12;border-radius:4px;padding:16px 18px;margin-bottom:24px;font-size:11px;line-height:1.7;}
    .conditions h3{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;opacity:0.5;margin-bottom:8px;}
    .conditions ul{padding-left:16px;}
    footer{border-top:1px solid #18332f18;padding-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:10px;line-height:1.7;opacity:0.65;}
    footer strong{display:block;font-size:11px;opacity:1;color:#18332f;margin-bottom:3px;}
    .seal{display:inline-flex;align-items:center;gap:6px;background:#b8860b15;border:1px solid #b8860b40;border-radius:999px;padding:4px 12px;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8a6000;margin-bottom:16px;}
  </style></head><body>
  <header>
    <div class="logo-block">
      <h1>Minuë<span style="color:#b8860b">.</span></h1>
      <p>Wholesale Catalogue</p>
    </div>
    <div class="meta">
      <strong>${orderRef}</strong><br>
      ${date}<br>
      <span class="serif" style="font-style:italic;font-size:13px;">Solicitud de pedido</span>
    </div>
  </header>

  <div class="seal">⬡ &nbsp;Pedido SS26 · Sin compromiso de pago</div>

  <h2>Productos seleccionados</h2>
  <table>
    <thead><tr>
      <th>Producto</th><th>Colección</th><th style="text-align:center">Uds.</th><th style="text-align:right">P/ud</th><th style="text-align:right">Subtotal</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="totals">
    <div class="totals-box">
      <div class="totals-row"><span>Unidades</span><span>${cartCount}</span></div>
      <div class="totals-row"><span>Tarifa aplicada</span><span>${currentTier?.label || '—'} · ${unitPrice != null ? unitPrice.toFixed(2).replace('.',',') + '€/ud' : 'Consultar'}</span></div>
      ${currentTier?.freeShip ? '<div class="totals-row"><span>Envío</span><span style="color:#18332f;font-weight:600;">Incluido ✓</span></div>' : ''}
      ${discountPct > 0 ? `<div class="totals-row"><span>Descuento aplicado</span><span style="color:#b8860b;font-weight:600;">−${discountPct}%</span></div>` : ''}
      <div class="totals-row"><span>Total pedido</span><span>${totalCost.toFixed(2).replace('.',',')}€</span></div>
      ${gainEur > 0 ? `<div class="gain-row"><span>Ganancia potencial a PVP</span><span>+${gainEur.toFixed(0)}€ (~${gainPct}%)</span></div>` : ''}
    </div>
  </div>

  <div class="conditions">
    <h3>Condiciones</h3>
    <ul>${conds}</ul>
  </div>

  <footer>
    <div>
      <strong>${contact.name}</strong>
      ${contact.address}<br>
      ${contact.phone}<br>
      ${contact.email}<br>
      ${contact.web}
    </div>
    <div>
      <strong>Entrega estimada</strong>
      ${isLatam ? 'Latinoamérica: 10–15 días hábiles' : 'España: 2–4 días · Europa: 4–7 días · Internacional: 6–9 días'}<br><br>
      <strong>Confirmación</strong>
      Recibirás confirmación de stock y plazos en menos de 24h tras enviar este pedido.
    </div>
  </footer>
  <script>window.onload=function(){window.print();}</script>
  </body></html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try { const s = typeof localStorage !== 'undefined' ? localStorage.getItem('minue_cart_v2') : null; return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [activeColors, setActiveColors] = useState([]);
  const [activeShapes, setActiveShapes] = useState([]);
  const [colFilter, setColFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [tarifasOpen, setTarifasOpen] = useState(false);
  const [lang, setLang] = useState('es');
  const [region, setRegion] = useState('es');
  const [newExpanded, setNewExpanded] = useState(false);
  const [openCollections, setOpenCollections] = useState({});
  const pendingScrollCol = useRef(null);
  const toggleCollection = (id) => setOpenCollections(prev => ({ ...prev, [id]: !prev[id] }));
  const [scrollY, setScrollY] = useState(0);
  const [toast, setToast] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [shareUrl, setShareUrl] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [flyItems, setFlyItems] = useState([]);
  const cartIconRef = useRef(null);
  const [familyCode, setFamilyCode] = useState(() => {
    try { return typeof localStorage !== 'undefined' ? (localStorage.getItem('minue_code') || '') : ''; } catch { return ''; }
  });
  const discountPct = familyCode.trim().toUpperCase() === 'FAMILY' ? 5 : 0;
  useEffect(() => {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem('minue_code', familyCode); } catch {}
  }, [familyCode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Inyectar Google Fonts
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Detección inicial de idioma y región
  useEffect(() => {
    const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('minue_lang') : null;
    const savedRegion = typeof localStorage !== 'undefined' ? localStorage.getItem('minue_region') : null;
    const l = savedLang || detectLang();
    setLang(l);
    setRegion(savedRegion || detectRegion(l));
  }, []);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('minue_lang', lang);
  }, [lang]);
  useEffect(() => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('minue_region', region);
  }, [region]);
  // Persist cart
  useEffect(() => {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem('minue_cart_v2', JSON.stringify(cart)); } catch {}
  }, [cart]);

  const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.es[k] || k;

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Scroll-reveal para secciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('mn-visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.mn-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const p = PRODUCTS.find(x => x.id === parseInt(id));
    return p ? { ...p, qty } : null;
  }).filter(Boolean);

  const currentTier = getTier(cartCount);
  const nextTier = getNextTier(cartCount);
  const unitPrice = currentTier?.price ?? null;
  const cartTotal = unitPrice ? unitPrice * cartCount : null;

  const addToCart = (id) => {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const p = PRODUCTS.find(x => x.id === id);
    if (p) {
      setToast({ name: p.name, id });
      setTimeout(() => setToast(null), 2200);
    }
  };
  const updateQty = (id, delta) => setCart(c => {
    const n = (c[id] || 0) + delta;
    if (n <= 0) { const copy = { ...c }; delete copy[id]; return copy; }
    return { ...c, [id]: n };
  });
  const removeFromCart = (id) => setCart(c => { const copy = { ...c }; delete copy[id]; return copy; });
  const toggleColor = (col) => setActiveColors(cs => cs.includes(col) ? cs.filter(x => x !== col) : [...cs, col]);
  const toggleShape = (sh) => setActiveShapes(ss => ss.includes(sh) ? ss.filter(x => x !== sh) : [...ss, sh]);
  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.length >= 2) {
      const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6);
      setSearchSuggestions(matches);
    } else {
      setSearchSuggestions([]);
    }
  };
  const buildShareUrl = () => {
    const ids = Object.keys(cart).join(',');
    const url = typeof window !== 'undefined' ? window.location.href.split('?')[0] + '?sel=' + ids : '';
    setShareUrl(url);
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(url);
    setTimeout(() => setShareUrl(null), 3000);
  };

  const topSix = useMemo(() =>
    [...PRODUCTS].sort((a, b) => a.rank - b.rank).slice(0, 14)
  , []);

  const novedades = useMemo(() => PRODUCTS.filter(p => p.isNew), []);

  const allFilteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter(p => {
      const matchColor = activeColors.length === 0 || activeColors.some(c => p.colors.includes(c));
      const matchShape = activeShapes.length === 0 || activeShapes.includes(p.shape);
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      const matchCol = colFilter === 'all' || p.col === colFilter;
      return matchColor && matchShape && matchSearch && matchCol;
    });
  }, [activeColors, activeShapes, colFilter, searchQuery]);

  const byCollection = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matchesColor = (p) => activeColors.length === 0 || activeColors.some(c => p.colors.includes(c));
    const matchesShape = (p) => activeShapes.length === 0 || activeShapes.includes(p.shape);
    const matchesSearch = (p) => !q || p.name.toLowerCase().includes(q) || p.col.toLowerCase().includes(q);
    const matchesCol = (p) => colFilter === 'all' || p.col === colFilter;
    return COLLECTIONS.map(col => ({
      ...col,
      items: PRODUCTS.filter(p => p.col === col.id && matchesColor(p) && matchesShape(p) && matchesSearch(p) && matchesCol(p)),
    })).filter(col => colFilter === 'all' || col.id === colFilter);
  }, [activeColors, activeShapes, colFilter, searchQuery]);

  const distributor = getDistributor(region);

  const buildOrderMessage = (lf = {}) => {
    const lines = cartItems.map(it => `${it.qty}x ${it.name} (${it.col})`);
    const tierLabel = currentTier?.label || '';
    const priceLine = unitPrice != null
      ? `${t('order_total_line')}: ${cartCount} ${t('panel_units')} × ${unitPrice.toFixed(2).replace('.', ',')}€ = ${cartTotal.toFixed(2).replace('.', ',')}€`
      : t('order_plus60').replace('{n}', cartCount);
    const leadLine = lf.name || lf.store
      ? `\n${lf.name}${lf.store ? ' — ' + lf.store : ''}${lf.email ? ' — ' + lf.email : ''}`
      : '';
    return `${t('order_greeting')}${leadLine}\n\n${lines.join('\n')}\n\n${t('order_tier')}: ${tierLabel}\n${priceLine}\n\n${t('order_closing')}`;
  };

  const sendWhatsApp = (lf = {}) => {
    if (!cartItems.length) return;
    if (typeof window !== 'undefined') window.open(`https://wa.me/${distributor.whatsapp}?text=${encodeURIComponent(buildOrderMessage(lf))}`, '_blank');
  };
  const sendEmail = (lf = {}) => {
    if (!cartItems.length) return;
    if (typeof window !== 'undefined') window.location.href = `mailto:${distributor.email}?subject=${encodeURIComponent('Pedido Wholesale Minuë SS26')}&body=${encodeURIComponent(buildOrderMessage(lf))}`;
  };

  useEffect(() => {
    document.body.style.overflow = (panelOpen || tarifasOpen || quickViewProduct || filtersOpen || menuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [panelOpen, tarifasOpen, quickViewProduct, filtersOpen, menuOpen]);

  // Fase 1: cuando cambia colFilter, abrir el acordeón y marcar el target pendiente
  useEffect(() => {
    if (colFilter !== 'all') {
      pendingScrollCol.current = colFilter;
      setOpenCollections(prev => ({ ...prev, [colFilter]: true }));
    } else if (activeColors.length > 0 || activeShapes.length > 0 || searchQuery) {
      const el = document.getElementById('catalog-start');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeColors, activeShapes, colFilter, searchQuery]);

  // Fase 2: después de que el acordeón se haya abierto (openCollections cambió), hacer scroll
  useEffect(() => {
    const target = pendingScrollCol.current;
    if (!target) return;
    if (!openCollections[target]) return;
    pendingScrollCol.current = null;
    // rAF doble: garantiza que el DOM ya está pintado
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(`col-${target}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, [openCollections]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; width: 100%; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: ${C}; color: ${G};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; padding: 0; }
        img { display: block; max-width: 100%; }
        a { color: inherit; text-decoration: none; }

        .mn-card { transition: transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s ease; overflow: hidden; }
        .mn-card:hover { transform: translateY(-3px); box-shadow: 0 22px 50px -24px rgba(24,51,47,0.22); }
        .mn-card .mn-img { transition: transform 0.6s cubic-bezier(.2,.7,.2,1); }
        .mn-card:hover .mn-img { transform: scale(1.08) rotate(2deg); }

        .mn-pill { transition: all 0.25s ease; }
        .mn-pill:hover { transform: translateY(-1px); }

        .mn-tabs-scroll::-webkit-scrollbar { display: none; }
        .mn-tabs-scroll { scrollbar-width: none; -ms-overflow-style: none; }

        @keyframes mn-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mn-slide { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes mn-slideBottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes mn-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mn-bar { from { width: 0%; } }
        @keyframes mn-marquee { from { transform: translateX(0%); } to { transform: translateX(-50%); } }

        .mn-overlay { animation: mn-fade 0.22s ease-out; }
        .mn-panel { animation: mn-slide 0.32s cubic-bezier(.2,.7,.2,1); }
        .mn-panel-bottom { animation: mn-slideBottom 0.32s cubic-bezier(.2,.7,.2,1); }
        .mn-rise { animation: mn-rise 0.45s ease-out both; }
        .mn-bar-fill { animation: mn-bar 0.6s cubic-bezier(.2,.7,.2,1); }

        .mn-fab { transition: transform 0.3s cubic-bezier(.2,.7,.2,1), box-shadow 0.3s ease; }
        .mn-fab:hover { transform: translateY(-2px); box-shadow: 0 18px 40px -14px rgba(24,51,47,0.45); }

        .mn-btn { transition: background 0.2s ease, transform 0.15s ease, border-color 0.2s ease; }
        .mn-btn:hover { transform: translateY(-1px); }
        .mn-btn:active { transform: translateY(0); }

        .mn-grid { display: grid; gap: 28px; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); }
        @media (max-width: 900px)  { .mn-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; } }
        @media (max-width: 600px)  { .mn-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        @media (max-width: 600px)  { .mn-card-img { aspect-ratio: 1/1 !important; } }
        @media (max-width: 600px)  { .mn-card-body { padding: 6px 4px 6px !important; } }
        @media (max-width: 360px)  { .mn-grid { grid-template-columns: 1fr; gap: 10px; } }

        .mn-top-grid { display: grid; gap: 24px; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1100px) { .mn-top-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 700px)  { .mn-top-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }

        /* Card interna — responsive por container */
        .mn-card-body { padding: 10px 8px 8px; }
        .mn-card-title { font-size: 18px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .mn-card-img { padding: 0; }
        @media (max-width: 600px) {
          .mn-card-body { padding: 8px 6px 6px; }
          .mn-card-title { font-size: 12px !important; }
          .mn-card-img { padding: 0 !important; }
          .mn-card-price-row { flex-direction: column !important; gap: 2px !important; align-items: flex-start !important; }
          .mn-card-price-badge { display: none !important; }
          .mn-card-btn { padding: 5px 6px !important; font-size: 9px !important; margin-top: 2px !important; }
          .mn-col-inner { padding: 12px !important; }
          .mn-qv-btn { opacity: 0.7 !important; }
        }

        .mn-pkg-grid { display: grid; gap: 24px; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 800px) { .mn-pkg-grid { grid-template-columns: 1fr; gap: 18px; } }
        .mn-pkg-outer { }
        @media (max-width: 860px) { .mn-pkg-outer { grid-template-columns: 1fr !important; } }
        .mn-card:hover .mn-qv-btn { opacity: 1 !important; }
        details > summary::-webkit-details-marker { display: none; }
        details > summary::marker { display: none; }
        details[open] > summary::after { content: ' ▲'; font-size: 8px; opacity: 0.4; }
        details:not([open]) > summary::after { content: ' ▼'; font-size: 8px; opacity: 0.4; }

        .mn-label { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; font-weight: 500; }
        .mn-label-xs { font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; }
        .mn-serif { font-family: 'Cormorant Garamond', serif; }
        .mn-serif-i { font-family: 'Cormorant Garamond', serif; font-style: italic; }

        /* ── Animaciones globales ── */
        @keyframes mn-fadein { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes mn-rise { from { opacity:0; transform:translate(-50%,-48%) scale(0.97); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
        @keyframes mn-slidein { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
        @keyframes mn-shimmer { 0%,100%{ background-position:200% center; } }
        @keyframes mn-pulse-dot { 0%,100%{ transform:scale(1); opacity:1; } 50%{ transform:scale(1.35); opacity:0.6; } }
        @keyframes mn-banner-in { from{ opacity:0; transform:translateY(-6px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes mn-char-in { from { opacity:0; transform:translateY(0.35em); } to { opacity:1; transform:translateY(0); } }
        @keyframes mn-ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @media(min-width:601px){ .mn-sticky-bar { display:none !important; } }
        @keyframes mn-cart-bounce { 0%,100%{ transform:scale(1); } 40%{ transform:scale(1.25); } 70%{ transform:scale(0.9); } }
        @keyframes mn-fadeout { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(0.5) translateY(-20px); } }

        /* Cards — fade-in escalonado + hover lift */
        .mn-card {
          animation: mn-fadein 0.35s ease-out both;
          transition: transform 0.22s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.22s ease;
          border-radius: 2px;
        }
        .mn-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px -8px rgba(24,51,47,0.14);
        }
        /* Imagen — zoom suave en hover */
        .mn-img {
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .mn-card:hover .mn-img { transform: scale(1.04); }

        /* Botones — micro-bounce */
        .mn-btn {
          transition: background 0.18s, color 0.18s, transform 0.14s, box-shadow 0.18s;
        }
        .mn-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px -4px rgba(24,51,47,0.2); }
        .mn-btn:active { transform: translateY(0) scale(0.98); }

        /* Pills nav */
        .mn-pill { transition: background 0.16s, border-color 0.16s, transform 0.14s; cursor: pointer; }
        .mn-pill:hover { transform: translateY(-1px); }

        /* Overlay fade */
        .mn-overlay { animation: mn-fadein 0.18s ease both; }

        /* Panel lateral */
        .mn-panel { animation: mn-slidein 0.3s cubic-bezier(0.25,0.46,0.45,0.94) both; }

        /* Banner superior */
        .mn-banner-anim { animation: mn-banner-in 0.5s 0.2s ease-out both; }

        /* Urgency dot pulsante */
        .mn-urgency-dot { animation: mn-pulse-dot 1.8s ease-in-out infinite; }

        /* Accordion FAQ */
        .mn-faq-answer {
          animation: mn-fadein 0.22s ease-out both;
        }

        /* Scroll reveal — añadido con IntersectionObserver */
        .mn-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .mn-reveal.mn-visible { opacity: 1; transform: translateY(0); }

        .mn-nav-text { }
        .mn-nav-collections { }
        @media (max-width: 900px) { .mn-nav-collections { display: none !important; } }
        .mn-hamburger { display: none; }
        @media (max-width: 560px) { .mn-hamburger { display: flex !important; } .mn-nav-actions { display: none !important; } }
        @media (max-width: 560px) {
          .mn-nav-text { display: none !important; }
          .mn-nav-logo { height: 28px !important; width: calc(28px * 3.08) !important; }
          .mn-nav-pill { padding: 9px 10px !important; }
          .mn-nav-gap { gap: 6px !important; }
          .mn-nav-inner { padding: 12px 14px !important; }
        }
        @media (max-width: 380px) {
          .mn-nav-logo { height: 22px !important; width: calc(22px * 3.08) !important; }
        }
        .mn-lang-wrap:hover .mn-lang-drop,
        .mn-lang-wrap:focus-within .mn-lang-drop { opacity: 1; pointer-events: auto; transform: translateY(0); }

        select.mn-select {
          appearance: none; -webkit-appearance: none; -moz-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2318332f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");
          background-repeat: no-repeat; background-position: right 12px center; padding-right: 34px;
        }
      `}</style>

      <div style={{ background: C, minHeight: '100vh', color: G }}>

        {/* NAV */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(248,239,230,0.72)',
          backdropFilter: 'saturate(1.8) blur(22px) brightness(1.04)',
          WebkitBackdropFilter: 'saturate(1.8) blur(22px) brightness(1.04)',
          borderBottom: `1px solid rgba(255,255,255,0.45)`,
          boxShadow: '0 1px 0 rgba(24,51,47,0.06), 0 4px 24px -8px rgba(24,51,47,0.08)',
        }}>
          <div style={{
            maxWidth: 1280, margin: '0 auto', padding: '14px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }} className="mn-nav-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Logo color={G} height={38} className="mn-nav-logo" />
              {/* Separador vertical */}
              <div style={{ width: 1, height: 28, background: `${G}20`, flexShrink: 0 }} />
              {/* Placa Retailer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{
                  fontSize: 8, fontWeight: 700, letterSpacing: 3,
                  textTransform: 'uppercase', color: D, lineHeight: 1,
                }}>Retailer</span>
                <span style={{
                  fontSize: 7, fontWeight: 400, opacity: 0.4,
                  letterSpacing: 1.5, textTransform: 'uppercase', lineHeight: 1,
                }}>Wholesale</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="mn-nav-gap mn-nav-actions">
              <LangSelector lang={lang} onChange={setLang} />
              <button onClick={() => setTarifasOpen(true)} className="mn-pill mn-nav-pill" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 14px', border: `1px solid ${D}`, color: D, borderRadius: 999,
                fontSize: 12, fontWeight: 500, letterSpacing: 0.3,
              }}>
                <IconInfo size={13} />
                <span className="mn-nav-text">{t('nav_rates')}</span>
              </button>
              {/* Links colecciones — solo desktop */}
              <div className="mn-nav-collections" style={{ display: 'flex', gap: 4 }}>
                {COLLECTIONS.map(c => (
                  <button key={c.id} onClick={() => {
                    setColFilter(c.id);
                  }} className="mn-pill" style={{
                    padding: '7px 11px', borderRadius: 999, fontSize: 11, fontWeight: 500,
                    border: `1px solid ${G}22`, color: G,
                    background: c.id === 'Acetato' ? `${D}10` : 'transparent',
                  }}>
                    {c.label}
                    {c.id === 'Acetato' && <span style={{ marginLeft: 4, fontSize: 8, color: D }}>★</span>}
                  </button>
                ))}
              </div>

              <a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }} className="mn-pill mn-nav-pill" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 14px', border: `1px solid ${G}33`, borderRadius: 999,
                fontSize: 12, fontWeight: 500, letterSpacing: 0.2,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span className="mn-nav-text">{t('nav_faq')}</span>
              </a>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }} className="mn-pill mn-nav-pill" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 14px', border: `1px solid ${G}33`, borderRadius: 999,
                fontSize: 12, fontWeight: 500, letterSpacing: 0.2,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span className="mn-nav-text">{t('nav_contact')}</span>
              </a>
              <a href="https://drive.google.com/uc?export=download&id=1NcxVq6PHiDay2mO2iQhN59sQLRrC-Zip" target="_blank" rel="noreferrer" className="mn-pill mn-nav-pill" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 14px', border: `1px solid ${G}33`, borderRadius: 999,
                fontSize: 12, fontWeight: 500, letterSpacing: 0.2,
              }}>
                <IconDownload />
                <span className="mn-nav-text">{t('nav_pdf')}</span>
              </a>
              <button ref={cartIconRef} onClick={() => setPanelOpen(true)} className="mn-pill mn-nav-pill" style={{
                position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 14px', background: G, color: C, borderRadius: 999,
                fontSize: 12, fontWeight: 500, letterSpacing: 0.3,
              }} aria-label="Open order">
                <IconBag />
                <span className="mn-nav-text">{t('nav_order')}</span>
                {cartCount > 0 && (
                  <span style={{
                    minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999,
                    background: D, color: G, fontSize: 10, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>{cartCount}</span>
                )}
              </button>
            </div>

            {/* HAMBURGUESA — solo móvil <560px */}
            <div className="mn-hamburger" style={{ display: 'none', alignItems: 'center', gap: 8 }}>
              <LangSelector lang={lang} onChange={setLang} />
              {cartCount > 0 && (
                <button onClick={() => setPanelOpen(true)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '8px 12px', background: G, color: C, borderRadius: 999,
                  fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer',
                }}>
                  <IconBag size={16} />
                  <span style={{
                    minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999,
                    background: D, color: G, fontSize: 10, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>{cartCount}</span>
                </button>
              )}
              <button onClick={() => setMenuOpen(o => !o)} style={{
                width: 36, height: 36, borderRadius: 999, border: `1px solid ${G}22`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', cursor: 'pointer',
              }}>
                {menuOpen ? <IconClose size={16} /> : (
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <line x1="0" y1="1" x2="16" y2="1" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="0" y1="6" x2="16" y2="6" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="0" y1="11" x2="16" y2="11" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>

          </div>

          {/* MENÚ MÓVIL desplegable */}
          {menuOpen && (
            <>
              <div onClick={() => setMenuOpen(false)} style={{
                position: 'fixed', inset: 0, zIndex: 38, background: 'rgba(24,51,47,0.3)',
              }} />
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 39,
                background: C, borderBottom: `1px solid ${G}18`,
                padding: '12px 20px 20px',
                boxShadow: '0 8px 24px -8px rgba(24,51,47,0.2)',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <button onClick={() => { setTarifasOpen(true); setMenuOpen(false); }} style={{
                  padding: '11px 14px', border: `1px solid ${D}`, color: D, borderRadius: 6,
                  fontSize: 13, fontWeight: 500, textAlign: 'left', background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <IconInfo size={14} /> {t('nav_rates')}
                </button>
                <a href={`https://drive.google.com/uc?export=download&id=1NcxVq6PHiDay2mO2iQhN59sQLRrC-Zip`} target="_blank" rel="noreferrer" style={{
                  padding: '11px 14px', border: `1px solid ${G}33`, borderRadius: 6,
                  fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8,
                  color: G, textDecoration: 'none',
                }}>
                  <IconDownload size={14} /> {t('nav_pdf')}
                </a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{
                  padding: '11px 14px', border: `1px solid ${G}33`, borderRadius: 6,
                  fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8,
                  color: G, textDecoration: 'none', cursor: 'pointer',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  {t('nav_faq')}
                </a>
                <a href="#contacto" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{
                  padding: '11px 14px', border: `1px solid ${G}33`, borderRadius: 6,
                  fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8,
                  color: G, textDecoration: 'none', cursor: 'pointer',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  {t('nav_contact')}
                </a>
                <div style={{ borderTop: `1px solid ${G}12`, paddingTop: 8, display: 'flex', gap: 6 }}>
                  {COLLECTIONS.map(c => (
                    <button key={c.id} onClick={() => {
                      setColFilter(c.id);
                      setMenuOpen(false);
                    }} style={{
                      flex: 1, padding: '8px 6px', borderRadius: 6, fontSize: 11, fontWeight: 500,
                      border: `1px solid ${G}22`, background: c.id === 'Acetato' ? `${D}10` : 'transparent',
                      cursor: 'pointer', color: G, textAlign: 'center',
                    }}>
                      {c.label}{c.id === 'Acetato' && ' ★'}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </nav>

        {/* IMPACT SECTION — stats + proceso unificados */}
        <ImpactSection t={t} />

        {/* CLIENTS TICKER — debajo de los stats, refuerza los números */}
        <ClientTicker t={t} />

        {/* BANNER EXPOSITORES */}
        <div className="mn-banner-anim" style={{
          background: D, color: G, overflow: 'hidden',
          borderBottom: `1px solid ${G}18`,
        }}>
          <div style={{
            maxWidth: 1280, margin: '0 auto', padding: '10px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontSize: 12, fontWeight: 600, letterSpacing: 0.3,
          }}>
            <IconGift size={15} />
            <span style={{ textAlign: 'center' }}>{t('banner_expositor')}</span>
          </div>
        </div>

        {/* HEADER */}
        <header style={{ background: G, color: C, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            maxWidth: 1280, margin: '0 auto',
            padding: 'clamp(50px, 8vw, 100px) 24px clamp(50px, 8vw, 100px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: 'clamp(30px, 4vw, 60px)',
            alignItems: 'center',
            position: 'relative',
          }} className="mn-hero-grid">

            {/* Texto izquierda */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: 0.75 }}>
                <span style={{ width: 28, height: 1, background: C, display: 'inline-block' }} />
                <span className="mn-label" style={{ color: D }}>{t('hdr_eyebrow')}</span>
              </div>

              <h1 className="mn-serif" style={{
                fontSize: 'clamp(36px, 5.5vw, 78px)',
                fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.01em', margin: 0,
              }}>
                {t('hdr_h1_a')} <span className="mn-serif-i" style={{ color: D, fontWeight: 400 }}>{t('hdr_h1_b')}</span><br/>
                {t('hdr_h1_c')}
              </h1>

              <p style={{
                maxWidth: 480, fontSize: 'clamp(13px, 1.3vw, 15px)',
                lineHeight: 1.55, opacity: 0.75, margin: 0, fontWeight: 300,
              }}>{t('hdr_sub')}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button onClick={() => scrollToId('top-ventas')} className="mn-pill" style={{
                  padding: '8px 14px', borderRadius: 999, border: `1px solid ${C}33`,
                  color: C, fontSize: 11, fontWeight: 500,
                }}>{t('hdr_chip_top')}</button>
                {COLLECTIONS.map(c => (
                  <button key={c.id} onClick={() => scrollToId(`col-${c.id}`)} className="mn-pill" style={{
                    padding: '8px 14px', borderRadius: 999, border: `1px solid ${C}33`,
                    color: C, fontSize: 11, fontWeight: 500,
                  }}>{c.label}</button>
                ))}
                <button onClick={() => setTarifasOpen(true)} className="mn-pill" style={{
                  padding: '8px 14px', borderRadius: 999, border: `1px solid ${D}`, background: `${D}1a`,
                  color: D, fontSize: 11, fontWeight: 500,
                }}>{t('hdr_chip_rates')}</button>
              </div>
            </div>

            {/* Imagen derecha */}
            <div style={{
              position: 'relative', borderRadius: 4, overflow: 'hidden',
              aspectRatio: '4/5', maxHeight: 'clamp(320px, 55vw, 580px)',
            }}>
              <img
                src="https://res.cloudinary.com/dekvzwn7b/image/upload/w_900,q_auto,f_auto/v1776281360/_ABD8565_vyyr2r.jpg"
                alt="Minuë — lookbook SS26"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Overlay sutil */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${G}22 0%, transparent 60%)`,
                pointerEvents: 'none',
              }} />
            </div>

          </div>
        </header>

        <style>{`
          @media (max-width: 700px) {
            .mn-hero-grid { grid-template-columns: 1fr !important; }
            .mn-hero-grid > div:last-child { max-height: 260px !important; }
          }
        `}</style>

        {/* BARRA TARIFAS */}
        <div style={{
          background: G, color: C,
          padding: '12px 24px',
          borderBottom: `1px solid rgba(248,239,230,0.1)`,
        }}>
          <div style={{
            maxWidth: 1280, margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 10,
          }}>
            {/* Pills de info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {[
                { icon: '€', text: 'Desde 17,90€/ud' },
                { icon: '↗', text: 'Vendes a 50–69€' },
                { icon: '%', text: 'Margen medio ~60%' },
              ].map((item, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '4px 11px', borderRadius: 999,
                  background: 'rgba(248,239,230,0.1)',
                  border: '1px solid rgba(248,239,230,0.18)',
                  fontSize: 11, fontWeight: 500, color: C, opacity: 0.9,
                }}>
                  <span style={{ fontSize: 10, color: D, fontWeight: 700 }}>{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
            <button onClick={() => setTarifasOpen(true)} style={{
              padding: '6px 14px', borderRadius: 999,
              border: `1px solid ${D}`, color: D,
              fontSize: 10, fontWeight: 700, background: 'transparent', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 5, letterSpacing: 0.3,
            }}>
              <IconInfo size={11} /> {t('bar_rate_btn')}
            </button>
          </div>
        </div>

        {/* BARRA DE PROGRESO */}
        {cartCount > 0 && (
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 0, marginBottom: 8,
            }}>
              {[
                { step: 1, label: t('progress_browse'), icon: '◎', done: true },
                { step: 2, label: t('progress_select'), icon: '◉', done: cartCount > 0 },
                { step: 3, label: t('progress_send'),   icon: '○', done: false },
              ].map((s, i) => (
                <React.Fragment key={s.step}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 999,
                    background: s.done ? `${G}0f` : 'transparent',
                    border: s.done ? `1px solid ${G}22` : `1px solid transparent`,
                  }}>
                    <span style={{ fontSize: 12, color: s.done ? D : `${G}44` }}>{s.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: s.done ? 600 : 400, opacity: s.done ? 1 : 0.4, letterSpacing: 0.3, textTransform: 'uppercase' }}>{s.label}</span>
                    {s.step === 2 && cartCount > 0 && (
                      <span style={{
                        minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999,
                        background: D, color: G, fontSize: 9, fontWeight: 700,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>{cartCount}</span>
                    )}
                  </div>
                  {i < 2 && <span style={{ color: `${G}28`, fontSize: 12, padding: '0 2px' }}>—</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* TOP VENTAS */}
        <section id="top-ventas" className="mn-reveal" style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(50px, 7vw, 80px) 24px 30px', scrollMarginTop: 80 }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            gap: 20, flexWrap: 'wrap', marginBottom: 'clamp(24px, 3vw, 36px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span className="mn-serif-i" style={{ fontSize: 24, color: D, fontWeight: 400 }}>№ 02</span>
              <div>
                <div className="mn-label" style={{ color: D, marginBottom: 6 }}>{t('top_eyebrow')}</div>
                <h2 className="mn-serif" style={{
                  fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 300,
                  letterSpacing: '-0.01em', margin: 0, lineHeight: 1.08,
                }}>
                  {t('top_h2_month_pre')}{' '}
                  <span className="mn-serif-i" style={{ color: D }}>
                    {(MONTH_NAMES[lang] || MONTH_NAMES.es)[new Date().getMonth()]}
                  </span>
                  {t('top_h2_c')}
                </h2>
              </div>
            </div>
            <p style={{ maxWidth: 320, fontSize: 12, lineHeight: 1.55, opacity: 0.65, margin: 0, fontWeight: 300 }}>
              {t('top_sub')}
            </p>
          </div>

          <div className="mn-top-grid">
            {topSix.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ProductCard product={p} added={cart[p.id] || 0}
                  onAdd={() => addToCart(p.id)} rank={i + 1} showRank variant="top"
                  colData={COLLECTIONS.find(c => c.id === p.col)}
                  currentTierPrice={unitPrice}
                  onQuickView={(p) => setQuickViewProduct(p)} t={t} />
              </div>
            ))}
          </div>
        </section>

        {/* NOVEDADES */}
        {novedades.length > 0 && (
          <section id="novedades" className="mn-reveal" style={{
            maxWidth: 1280, margin: '0 auto', padding: 'clamp(50px, 7vw, 80px) 24px 20px',
            scrollMarginTop: 80,
          }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              gap: 20, flexWrap: 'wrap', marginBottom: 'clamp(24px, 3vw, 36px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span className="mn-serif-i" style={{ fontSize: 24, color: D, fontWeight: 400 }}>✦</span>
                <div>
                  <div className="mn-label" style={{ color: D, marginBottom: 6 }}>{t('new_eyebrow')}</div>
                  <h2 className="mn-serif" style={{
                    fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 300,
                    letterSpacing: '-0.01em', margin: 0, lineHeight: 1.08,
                  }}>
                    {t('new_h2_a')} <span className="mn-serif-i">{t('new_h2_b')}</span>{t('new_h2_c')}
                  </h2>
                </div>
              </div>
              <p style={{ maxWidth: 300, fontSize: 12, lineHeight: 1.55, opacity: 0.65, margin: 0, fontWeight: 300 }}>
                {t('new_sub')}
              </p>
            </div>

            <div className="mn-grid">
              {(newExpanded ? novedades : novedades.slice(0, 4)).map(p => (
                <ProductCard key={p.id} product={p} added={cart[p.id] || 0}
                  onAdd={() => addToCart(p.id)} t={t} isNew
                  colData={COLLECTIONS.find(c => c.id === p.col)}
                  currentTierPrice={unitPrice}
                  onQuickView={setQuickViewProduct} />
              ))}
            </div>

            {novedades.length > 4 && (
              <div style={{ textAlign: 'center', marginTop: 28 }}>
                <button onClick={() => setNewExpanded(e => !e)} className="mn-btn" style={{
                  padding: '12px 24px', borderRadius: 999,
                  border: `1px solid ${G}44`, fontSize: 13, fontWeight: 500, letterSpacing: 0.3,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  {newExpanded ? t('new_show_less') : `${t('new_show_more')} (${novedades.length - 4})`}
                  <span style={{ fontSize: 16, lineHeight: 0 }}>{newExpanded ? '↑' : '↓'}</span>
                </button>
              </div>
            )}
          </section>
        )}

        {/* ANCHOR para auto-scroll al filtrar */}
        <div id="catalog-start" style={{ scrollMarginTop: 140 }} />

        {/* BARRA FILTROS SIMPLIFICADA */}
        <div style={{
          position: 'sticky', top: 59, zIndex: 30,
          background: `${C}f5`,
          backdropFilter: 'saturate(1.3) blur(10px)',
          WebkitBackdropFilter: 'saturate(1.3) blur(10px)',
          borderTop: `1px solid ${G}15`, borderBottom: `1px solid ${G}15`,
          marginTop: 0,
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '10px 24px' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>

              {/* Buscador */}
              <div style={{ position: 'relative', flex: '1 1 160px', maxWidth: 260 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 12px', border: `1px solid ${G}28`, borderRadius: 999,
                  background: 'white',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input value={searchQuery} onChange={e => handleSearch(e.target.value)}
                    placeholder={t('search_placeholder')}
                    style={{ border: 'none', outline: 'none', fontSize: 11, fontFamily: 'inherit', color: G, background: 'transparent', width: '100%' }}
                  />
                  {searchQuery && <button onClick={() => handleSearch('')} style={{ fontSize: 13, opacity: 0.4, lineHeight: 1 }}>✕</button>}
                </div>
                {searchSuggestions.length > 0 && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 50,
                    background: C, border: `1px solid ${G}22`, borderRadius: 8,
                    boxShadow: '0 8px 24px -8px rgba(24,51,47,0.2)', overflow: 'hidden',
                  }}>
                    {searchSuggestions.map(p => {
                      const col = COLLECTIONS.find(c => c.id === p.col);
                      return (
                        <button key={p.id} onClick={() => { setQuickViewProduct(p); setSearchSuggestions([]); }} style={{
                          width: '100%', padding: '9px 14px', textAlign: 'left',
                          display: 'flex', alignItems: 'center', gap: 10,
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          borderBottom: `1px solid ${G}0f`,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = `${G}08`}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          {p.img ? <img src={p.img} alt={p.name} style={{ width: 32, height: 24, objectFit: 'contain', background: '#fff', padding: 2, borderRadius: 2 }} /> :
                            <div style={{ width: 32, height: 24, background: `${G}10`, borderRadius: 2 }} />}
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 500 }}>{p.name}</div>
                            <div style={{ fontSize: 10, opacity: 0.5 }}>{p.col} · {col?.rrp}€</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Tabs colección */}
              <div style={{ display: 'flex', gap: 5, overflowX: 'auto' }} className="mn-tabs-scroll">
                {[{ id: 'all', label: t('tab_all') }, ...COLLECTIONS.map(c => ({ id: c.id, label: c.label }))].map(tab => (
                  <button key={tab.id} onClick={() => setColFilter(tab.id)} className="mn-pill" style={{
                    flexShrink: 0, padding: '6px 13px', borderRadius: 999, fontSize: 11, fontWeight: 500,
                    border: `1px solid ${colFilter === tab.id ? G : `${G}22`}`,
                    background: colFilter === tab.id ? G : 'transparent',
                    color: colFilter === tab.id ? C : G, transition: 'all 0.2s',
                  }}>{tab.label}</button>
                ))}
              </div>

              {/* Botón Filtrar + Share */}
              <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', flexShrink: 0 }}>
                <button onClick={() => setFiltersOpen(true)} className="mn-pill" style={{
                  padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500,
                  border: `1px solid ${(activeShapes.length + activeColors.length) > 0 ? G : `${G}33`}`,
                  background: (activeShapes.length + activeColors.length) > 0 ? `${G}0f` : 'transparent',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
                  {t('filters_btn')}
                  {(activeShapes.length + activeColors.length) > 0 && (
                    <span style={{ minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: D, color: G, fontSize: 9, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      {activeShapes.length + activeColors.length}
                    </span>
                  )}
                </button>
                {cartCount > 0 && (
                  <button onClick={buildShareUrl} className="mn-pill" style={{
                    padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500,
                    border: `1px solid ${D}`, color: shareUrl ? D : G,
                    background: shareUrl ? `${D}12` : 'transparent',
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    {shareUrl ? t('share_copied') : t('share_btn')}
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* BLOQUES POR COLECCIÓN — colapsables */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 60px' }}>

          {/* Botón flotante para cerrar colección abierta */}
          {Object.entries(openCollections).some(([,v]) => v) && (() => {
            const openId = Object.entries(openCollections).find(([,v]) => v)?.[0];
            const openCol = byCollection.find(c => c.id === openId);
            if (!openCol) return null;
            return (
              <div style={{
                position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
                zIndex: 45, pointerEvents: 'auto',
              }}>
                <button
                  onClick={() => {
                    toggleCollection(openId);
                    document.getElementById(`col-${openId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', borderRadius: 999,
                    background: G, color: C,
                    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                    boxShadow: '0 8px 24px -8px rgba(24,51,47,0.5)',
                    border: `1px solid rgba(248,239,230,0.15)`,
                    cursor: 'pointer',
                    animation: 'mn-fadein 0.2s ease-out both',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
                  Cerrar {openCol.id}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            );
          })()}
          {byCollection.map((col, idx) => {
            const isOpen = !!openCollections[col.id];
            const allItems = PRODUCTS.filter(p => p.col === col.id);
            const previewItems = allItems.filter(p => p.img).slice(0, 4);
            const colData = COLLECTIONS.find(c => c.id === col.id);

            return (
              <div key={col.id} id={`col-${col.id}`} style={{
                borderRadius: 6, overflow: 'hidden',
                border: `1px solid ${G}18`,
                marginBottom: 12,
                scrollMarginTop: 140,
              }}>
                {/* CABECERA COLAPSABLE */}
                <button
                  onClick={() => toggleCollection(col.id)}
                  style={{
                    width: '100%', background: isOpen ? G : `${G}06`,
                    color: isOpen ? C : G,
                    padding: 'clamp(16px, 2.5vw, 24px) clamp(16px, 3vw, 28px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 16, cursor: 'pointer', border: 'none', textAlign: 'left',
                    transition: 'background 0.25s, color 0.25s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, minWidth: 0 }}>
                    {/* Thumbnails preview */}
                    {!isOpen && (
                      <div style={{ display: 'flex', gap: -6, flexShrink: 0 }}>
                        {previewItems.slice(0, 3).map((p, i) => (
                          <div key={p.id} style={{
                            width: 40, height: 32, borderRadius: 4,
                            background: '#fff', border: `2px solid ${C}`,
                            marginLeft: i > 0 ? -8 : 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden', padding: 3,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                          }}>
                            <img src={p.img} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                        ))}
                        {previewItems.length === 0 && (
                          <div style={{ width: 40, height: 32, borderRadius: 4, background: `${G}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="20" height="13" viewBox="0 0 42 28" fill="none"><rect x="1" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/><rect x="25" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/><line x1="17" y1="10" x2="25" y2="10" stroke={G} strokeWidth="1.5"/></svg>
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
                        opacity: isOpen ? 0.7 : 0.5, marginBottom: 3,
                      }}>{t('col_eyebrow')}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                        <span className="mn-serif" style={{
                          fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 300,
                          letterSpacing: '-0.01em', lineHeight: 1,
                        }}>{col.label}</span>
                        {col.id === 'Acetato' && (
                          <span style={{
                            fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                            padding: '2px 8px', borderRadius: 999,
                            background: isOpen ? `${D}22` : `${D}18`,
                            color: D, border: `1px solid ${D}44`,
                          }}>{t('acetato_premium')}</span>
                        )}
                        <span style={{
                          fontSize: 11, opacity: 0.6, fontWeight: 300,
                        }}>{allItems.length} {t('col_models')}</span>
                        {col.items.length !== allItems.length && (
                          <span style={{
                            fontSize: 10, padding: '2px 7px', borderRadius: 999,
                            background: isOpen ? `${C}22` : `${D}18`, color: isOpen ? C : D,
                            fontWeight: 600,
                          }}>
                            {col.items.length} filtrados
                          </span>
                        )}
                      </div>
                      {!isOpen && (
                        <p style={{
                          margin: '4px 0 0', fontSize: 11, opacity: 0.5, fontWeight: 300,
                          fontStyle: 'italic', lineHeight: 1.4,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{t(col.tagKey)}</p>
                      )}
                    </div>
                  </div>

                  {/* Precio + chevron */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                    {!isOpen && colData && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 9, opacity: 0.5, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 1 }}>PVP rec.</div>
                        <div className="mn-serif" style={{ fontSize: 18, fontWeight: 400 }}>{colData.rrp}€</div>
                      </div>
                    )}
                    <div style={{
                      width: 28, height: 28, borderRadius: 999,
                      border: `1px solid ${isOpen ? C + '44' : G + '22'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}>
                      <IconChevron size={12} />
                    </div>
                  </div>
                </button>

                {/* GRID EXPANDIDO */}
                {isOpen && (
                  <div style={{ padding: 'clamp(12px,3vw,28px)' }} className="mn-col-inner">
                    {col.items.length === 0 ? (
                      <div style={{
                        padding: '40px 20px', textAlign: 'center', opacity: 0.5,
                        border: `1px dashed ${G}22`, borderRadius: 4,
                      }}>
                        <p className="mn-serif-i" style={{ fontSize: 16, marginBottom: 4 }}>{t('empty_filter_t')}</p>
                        <p style={{ fontSize: 12 }}>{t('empty_filter_d')}</p>
                      </div>
                    ) : (
                      <>
                        <p style={{
                          fontSize: 12, lineHeight: 1.55, opacity: 0.65,
                          fontStyle: 'italic', fontWeight: 300, margin: '0 0 20px',
                        }}>{t(col.tagKey)}</p>
                        <div className="mn-grid">
                          {(() => {
                            // Agrupar por modelo (primer token del nombre, con excepción de "Cooper II")
                            const getBase = (name) => {
                              const parts = name.split(' ');
                              if (parts[0] === 'Cooper' && parts[1] === 'II') return 'Cooper II';
                              return parts[0];
                            };
                            const families = {};
                            col.items.forEach(p => {
                              const base = getBase(p.name);
                              if (!families[base]) families[base] = [];
                              families[base].push(p);
                            });
                            return Object.entries(families).map(([base, items]) => {
                              // Representante: el que tenga imagen con menor rank (más popular)
                              const rep = items.find(p => p.img) || items[0];
                              const allColors = items.flatMap(p => p.colors || []);
                              const uniqueColors = [...new Set(allColors)].slice(0, 6);
                              const inCartCount = items.reduce((s, p) => s + (cart[p.id] || 0), 0);
                              return (
                                <div
                                  key={base}
                                  className="mn-card"
                                  onClick={() => setQuickViewProduct(rep)}
                                  style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                                >
                                  {/* Imagen */}
                                  <div className="mn-card-img" style={{
                                    position: 'relative', aspectRatio: '3/2',
                                    background: 'transparent', borderRadius: 2, overflow: 'hidden',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  }}>
                                    {rep.img ? (
                                      <img src={rep.img} alt={base} className="mn-img" style={{
                                        width: '100%', height: '100%', objectFit: 'contain', padding: '8px',
                                      }} />
                                    ) : (
                                      // Placeholder con color del diseño
                                      <div style={{
                                        position: 'absolute', inset: 0,
                                        display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center', gap: 10,
                                        background: items[0]?.colors?.[0] ? `${COLOR_DOTS[items[0].colors[0]] || '#ccc'}22` : `${G}06`,
                                      }}>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                          {uniqueColors.slice(0, 3).map((c, i) => (
                                            <div key={i} style={{
                                              width: 20, height: 20, borderRadius: 999,
                                              background: COLOR_DOTS[c] || '#999',
                                              border: `2px solid rgba(255,255,255,0.5)`,
                                              boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                                            }} />
                                          ))}
                                        </div>
                                        <span style={{
                                          fontSize: 9, fontWeight: 700,
                                          letterSpacing: 1.5, textTransform: 'uppercase',
                                          color: G, opacity: 0.5,
                                        }}>{base}</span>
                                        <span style={{
                                          fontSize: 7, opacity: 0.35,
                                          letterSpacing: 0.5,
                                        }}>Imagen próximamente</span>
                                      </div>
                                    )}
                                    {/* Badge variantes */}
                                    {items.length > 1 && (
                                      <span style={{
                                        position: 'absolute', top: 8, right: 8,
                                        padding: '2px 7px', borderRadius: 999,
                                        background: 'rgba(248,239,230,0.9)', backdropFilter: 'blur(4px)',
                                        border: `1px solid ${G}22`,
                                        fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: G,
                                      }}>{items.length} colores</span>
                                    )}
                                    {/* Badge urgency/new del representante */}
                                    {(rep.urgency || rep.isNew) && (
                                      <span style={{
                                        position: 'absolute', top: 8, left: 8,
                                        padding: '2px 7px', borderRadius: 999,
                                        background: rep.urgency ? (URGENCY_COLORS[rep.urgency] || D) : D,
                                        color: rep.urgency ? '#fff' : G,
                                        fontSize: 8, fontWeight: 700, letterSpacing: 1,
                                      }}>
                                        {rep.urgency ? t(URGENCY_LABELS[rep.urgency]) : t('new_badge')}
                                      </span>
                                    )}
                                    {/* Badge en carrito */}
                                    {inCartCount > 0 && (
                                      <span style={{
                                        position: 'absolute', bottom: 8, left: 8,
                                        width: 20, height: 20, borderRadius: 999,
                                        background: G, color: C,
                                        fontSize: 9, fontWeight: 700,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      }}>{inCartCount}</span>
                                    )}
                                  </div>
                                  {/* Info */}
                                  <div className="mn-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
                                      <h4 className="mn-serif mn-card-title" style={{
                                        fontSize: 17, fontWeight: 800, lineHeight: 1.2, margin: 0,
                                        letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                      }}>{base}</h4>
                                      <div style={{
                                        flexShrink: 0, padding: '2px 7px', borderRadius: 999,
                                        background: `rgba(24,51,47,0.07)`,
                                        display: 'inline-flex', alignItems: 'center', gap: 3,
                                      }}>
                                        <span style={{ fontSize: 8, opacity: 0.55, fontWeight: 500, textTransform: 'uppercase' }}>{t('margin_label')}</span>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: G }}>~{Math.round(((colData?.rrp ?? 50) - (unitPrice ?? DISPLAY_PRICE)) / (colData?.rrp ?? 50) * 100)}%</span>
                                      </div>
                                    </div>
                                    {/* Dots de todos los colores */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                                      {uniqueColors.map((c, i) => (
                                        <span key={i} style={{
                                          width: 8, height: 8, borderRadius: 999,
                                          background: COLOR_DOTS[c] || '#999',
                                          border: c === 'beige' || c === 'crema' || c === 'blanco' ? `1px solid ${G}33` : 'none',
                                        }} />
                                      ))}
                                      {items.flatMap(p => p.colors).length > 6 && (
                                        <span style={{ fontSize: 8, opacity: 0.4 }}>+{items.flatMap(p => p.colors).length - 6}</span>
                                      )}
                                    </div>
                                    {/* CTA */}
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setQuickViewProduct(rep); }}
                                      className="mn-btn mn-card-btn"
                                      style={{
                                        marginTop: 2, alignSelf: 'stretch',
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                                        padding: '8px 10px', borderRadius: 999,
                                        background: inCartCount > 0 ? G : 'transparent',
                                        color: inCartCount > 0 ? C : G,
                                        border: `1px solid ${G}33`,
                                        fontSize: 11, fontWeight: 500, letterSpacing: 0.3,
                                      }}
                                    >
                                      {inCartCount > 0 ? `✓ ${inCartCount} en pedido` : `Ver colores →`}
                                    </button>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                          <button onClick={() => toggleCollection(col.id)} style={{
                            fontSize: 11, opacity: 0.5, textDecoration: 'underline',
                            textUnderlineOffset: 3, background: 'none', border: 'none',
                            cursor: 'pointer', color: G, padding: '6px',
                          }}>{t('col_collapse')}</button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PACKAGING */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px, 9vw, 100px) 24px 40px' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap',
            marginBottom: 'clamp(28px, 4vw, 44px)', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span className="mn-serif-i" style={{ fontSize: 24, color: D, fontWeight: 400 }}>№ 06</span>
              <div>
                <div className="mn-label" style={{ color: D, marginBottom: 6 }}>{t('pkg_eyebrow')}</div>
                <h3 className="mn-serif" style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 300, letterSpacing: '-0.01em', margin: 0, lineHeight: 1.05 }}>
                  {t('pkg_h2_a')} <span className="mn-serif-i">{t('pkg_h2_b')}</span>{t('pkg_h2_c')}
                </h3>
              </div>
            </div>
            <p style={{ maxWidth: 360, fontSize: 13, lineHeight: 1.55, opacity: 0.7, margin: 0, fontWeight: 300, fontStyle: 'italic' }}>{t('pkg_sub')}</p>
          </div>

          {/* Layout: imagen izquierda + contenido derecha */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px,420px) 1fr', gap: 'clamp(20px, 4vw, 48px)', alignItems: 'stretch' }} className="mn-pkg-outer">
            <div style={{ borderRadius: 4, overflow: 'hidden', background: G, minHeight: 300 }}>
              <img
                src="https://res.cloudinary.com/dekvzwn7b/image/upload/w_800,q_auto,f_auto/v1776287609/MINUE_5_v6cnmm.png"
                alt="Minuë Packaging"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Qué incluye cada caja */}
              <div style={{ padding: '20px 22px', border: `1px solid ${G}1f`, borderRadius: 4, background: `${G}05` }}>
                <div className="mn-label-xs" style={{ color: D, marginBottom: 14 }}>{t('pkg_contents_label')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[
                    t('pkg_item1'),
                    t('pkg_item2'),
                    t('pkg_item3'),
                    t('pkg_item4'),
                    t('pkg_item5'),
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 300 }}>
                      <span style={{ width: 18, height: 18, borderRadius: 999, background: `${D}1a`, border: `1px solid ${D}44`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconCheck size={10} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Puntos restantes */}
              {[
                { n: '02', tt: t('pkg2_t'), d: t('pkg2_d') },
                { n: '03', tt: t('pkg3_t'), d: t('pkg3_d') },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px 22px', border: `1px solid ${G}1f`, borderRadius: 4, background: `${G}05`, flex: 1, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span className="mn-serif-i" style={{ fontSize: 24, color: D, fontWeight: 400, lineHeight: 1, flexShrink: 0 }}>{item.n}</span>
                  <div>
                    <h4 className="mn-serif" style={{ fontSize: 19, fontWeight: 400, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{item.tt}</h4>
                    <p style={{ fontSize: 12, lineHeight: 1.6, opacity: 0.75, margin: 0, fontWeight: 300 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRESENCIA GLOBAL + FAIRE RATING */}
        <GlobalMap t={t} />
        <FaireRating />

        {/* ESPECIFICACIONES TÉCNICAS — bloque sutil sobre fondo crema */}
        <section style={{ background: `${G}06`, borderTop: `1px solid ${G}12`, borderBottom: `1px solid ${G}12` }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px,6vw,60px) 24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 28, justifyContent: 'space-between' }}>
              <div>
                <div className="mn-label" style={{ color: D, marginBottom: 6, opacity: 0.7 }}>{t('tech_eyebrow')}</div>
                <h3 className="mn-serif" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 300, letterSpacing: '-0.01em', margin: 0, opacity: 0.85 }}>
                  {t('tech_h2')}
                </h3>
              </div>
              <p style={{ maxWidth: 400, fontSize: 12, lineHeight: 1.6, opacity: 0.5, margin: 0, fontWeight: 300, fontStyle: 'italic' }}>{t('tech_sub')}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { label: t('tech_uv'),     desc: t('tech_uv_d'),     icon: '☀️' },
                { label: t('tech_cat'),    desc: t('tech_cat_d'),    icon: '🔆' },
                { label: t('tech_ce'),     desc: t('tech_ce_d'),     icon: 'CE' },
                { label: t('tech_impact'), desc: t('tech_impact_d'), icon: '⬡' },
                { label: t('tech_drop'),   desc: t('tech_drop_d'),   icon: '●' },
                { label: t('tech_fod'),    desc: t('tech_fod_d'),    icon: '✓' },
              ].map((spec, i) => (
                <div key={i} style={{
                  padding: '16px 16px', borderRadius: 6,
                  border: `1px solid ${G}14`, background: `${C}60`,
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: 999,
                      background: `${D}12`, border: `1px solid ${D}22`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: D, flexShrink: 0,
                    }}>{spec.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.2 }}>{spec.label}</span>
                  </div>
                  <p style={{ fontSize: 11, lineHeight: 1.5, opacity: 0.55, margin: 0, fontWeight: 300 }}>{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POR QUÉ MINUË — Bento Grid 2026 */}
        <section style={{ background: G, color: C, marginTop: 20 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(50px,7vw,80px) 24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 'clamp(32px,5vw,56px)', justifyContent: 'space-between' }}>
              <div>
                <div className="mn-label" style={{ color: D, marginBottom: 8 }}>{t('why_eyebrow')}</div>
                <h3 className="mn-serif" style={{ fontSize:'clamp(30px,4.5vw,52px)', fontWeight:300, letterSpacing:'-0.01em', margin:0, lineHeight:1.05 }}>
                  {t('why_h2_a')}<span className="mn-serif-i" style={{ color: D }}>{t('why_h2_b')}</span>{t('why_h2_c')}
                </h3>
              </div>
              <p style={{ maxWidth:340, fontSize:13, lineHeight:1.7, opacity:0.55, margin:0, fontWeight:300, fontStyle:'italic' }}>{t('why_sub')}</p>
            </div>

            {/* BENTO */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto', gap: 10 }} className="mn-bento">

              {/* Celda grande — foto */}
              <div className="mn-bento-photo" style={{ gridColumn: '1/6', gridRow: '1/3', borderRadius: 8, overflow:'hidden', minHeight: 280, position: 'relative' }}>
                <img src="https://res.cloudinary.com/dekvzwn7b/image/upload/w_800,q_auto,f_auto/v1776281988/_ANT3201_lhwuw6.jpg"
                  alt="Minuë SS26" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(0.85)' }} />
                <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg,${G}44 0%,transparent 70%)`, pointerEvents:'none' }} />
                <div style={{ position:'absolute', bottom:20, left:20 }}>
                  <div className="mn-label-xs" style={{ color:D, marginBottom:6 }}>SS26</div>
                  <div className="mn-serif" style={{ fontSize:22, fontWeight:300, lineHeight:1.1 }}>Bergman Collection</div>
                </div>
              </div>

              {/* 01 */}
              <div className="mn-bento-card" style={{ gridColumn:'6/10', gridRow:'1/2', borderRadius:8, padding:'22px 20px', border:`1px solid ${C}12`, background:`${C}04`, display:'flex', gap:14, alignItems:'flex-start', transition:'background 0.2s' }}>
                <span className="mn-serif-i" style={{ fontSize:36, color:D, fontWeight:300, lineHeight:0.85, flexShrink:0 }}>01</span>
                <div>
                  <h4 className="mn-serif" style={{ fontSize:17, fontWeight:400, margin:'0 0 6px' }}>{t('why_1_t')}</h4>
                  <p style={{ fontSize:12, lineHeight:1.6, opacity:0.6, margin:0, fontWeight:300 }}>{t('why_1_d')}</p>
                </div>
              </div>

              {/* 02 */}
              <div className="mn-bento-card" style={{ gridColumn:'10/13', gridRow:'1/2', borderRadius:8, padding:'22px 18px', background:`${D}10`, border:`1px solid ${D}20`, display:'flex', flexDirection:'column', gap:10, transition:'background 0.2s' }}>
                <span className="mn-serif-i" style={{ fontSize:36, color:D, fontWeight:300, lineHeight:0.85 }}>02</span>
                <h4 className="mn-serif" style={{ fontSize:16, fontWeight:400, margin:0 }}>{t('why_2_t')}</h4>
                <p style={{ fontSize:11, lineHeight:1.6, opacity:0.6, margin:0, fontWeight:300 }}>{t('why_2_d')}</p>
              </div>

              {/* 03 — ancho medio */}
              <div className="mn-bento-card" style={{ gridColumn:'6/10', gridRow:'2/3', borderRadius:8, padding:'22px 20px', border:`1px solid ${C}12`, background:`${C}04`, display:'flex', gap:14, alignItems:'flex-start', transition:'background 0.2s' }}>
                <span className="mn-serif-i" style={{ fontSize:36, color:D, fontWeight:300, lineHeight:0.85, flexShrink:0 }}>03</span>
                <div>
                  <h4 className="mn-serif" style={{ fontSize:17, fontWeight:400, margin:'0 0 6px' }}>{t('why_3_t')}</h4>
                  <p style={{ fontSize:12, lineHeight:1.6, opacity:0.6, margin:0, fontWeight:300 }}>{t('why_3_d')}</p>
                </div>
              </div>

              {/* 04 — estrecho con acento */}
              <div className="mn-bento-card" style={{ gridColumn:'10/13', gridRow:'2/3', borderRadius:8, padding:'22px 18px', background:`${C}06`, border:`1px solid ${C}10`, display:'flex', flexDirection:'column', gap:10, transition:'background 0.2s' }}>
                <span className="mn-serif-i" style={{ fontSize:36, color:D, fontWeight:300, lineHeight:0.85 }}>04</span>
                <h4 className="mn-serif" style={{ fontSize:16, fontWeight:400, margin:0 }}>{t('why_4_t')}</h4>
                <p style={{ fontSize:11, lineHeight:1.6, opacity:0.6, margin:0, fontWeight:300 }}>{t('why_4_d')}</p>
              </div>

            </div>

            {/* Footer strip */}
            <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap', paddingTop:24, marginTop:10, borderTop:`1px solid ${C}18` }}>
              <span style={{ fontSize:11, opacity:0.6, fontWeight:400, letterSpacing:0.3 }}>{t('why_presente')}</span>
              <span style={{ opacity:0.5, fontSize:10 }}>·</span>
              <span style={{ fontSize:12, opacity:0.7, fontWeight:300 }}>{t('why_presente_d')}</span>
              <span style={{ opacity:0.5, fontSize:10 }}>·</span>
              <a href="https://minueopticians.faire.com" target="_blank" rel="noreferrer" style={{
                fontSize:11, color:D, fontWeight:600, letterSpacing:0.5,
                border:`1px solid ${D}`, padding:'4px 12px', borderRadius:999,
              }}>{t('why_faire')}</a>
            </div>
          </div>
        </section>

        <style>{`
          .mn-bento-card:hover { background: rgba(248,239,230,0.08) !important; }
          @media (max-width: 680px) {
            .mn-bento { grid-template-columns: 1fr !important; }
            .mn-bento-photo { grid-column: 1/-1 !important; grid-row: auto !important; min-height: 220px !important; }
            .mn-bento-card { grid-column: 1/-1 !important; grid-row: auto !important; }
          }
          @media (min-width: 681px) and (max-width: 1000px) {
            .mn-bento-photo { grid-column: 1/7 !important; }
            .mn-bento-card:nth-child(2) { grid-column: 7/13 !important; grid-row: 1/2 !important; }
            .mn-bento-card:nth-child(3) { grid-column: 7/13 !important; grid-row: 2/3 !important; }
            .mn-bento-card:nth-child(4) { grid-column: 1/7 !important; grid-row: 3/4 !important; }
            .mn-bento-card:nth-child(5) { grid-column: 7/13 !important; grid-row: 3/4 !important; }
          }
        `}</style>

        {/* FAQ */}
        <FaqSection t={t} />

        {/* CTA TARIFAS */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{
            padding: 'clamp(40px, 6vw, 64px)',
            background: G, color: C, borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 24, flexWrap: 'wrap',
          }}>
            <div style={{ flex: '1 1 320px' }}>
              <div className="mn-label" style={{ color: D, marginBottom: 10 }}>{t('cta_eyebrow')}</div>
              <h3 className="mn-serif" style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 300,
                letterSpacing: '-0.01em', margin: 0, lineHeight: 1.1,
              }}>
                {t('cta_h3_a')} <span className="mn-serif-i" style={{ color: D }}>{t('cta_h3_b')}</span>{t('cta_h3_c')}<br/>
                {t('cta_h3_d')}
              </h3>
              <p style={{ marginTop: 16, fontSize: 13, opacity: 0.75, lineHeight: 1.55, fontWeight: 300, maxWidth: 560 }}>
                {t('cta_sub')}
              </p>
            </div>
            <button onClick={() => setTarifasOpen(true)} className="mn-btn" style={{
              background: D, color: G, padding: '14px 24px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, letterSpacing: 0.4,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <IconInfo size={14} /> {t('cta_btn')}
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contacto" style={{ background: G, color: C, padding: 'clamp(50px, 7vw, 80px) 24px 40px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            {/* Logo + tagline */}
            <div style={{ marginBottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <Logo color={C} height={42} />
                <p style={{ fontSize: 12, lineHeight: 1.65, opacity: 0.55, fontWeight: 300, maxWidth: 320, marginTop: 12 }}>
                  Distribución wholesale internacional · Diseño handcrafted in Spain
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, fontWeight: 300, opacity: 0.6 }}>
                <span>{t('ft_cond1')}</span>
                <span>{t('ft_cond2')}</span>
                <span>{t('ft_cond3')}</span>
                <span>{t('ft_cond4')}</span>
              </div>
            </div>

            {/* CARDS DE CONTACTO */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16, marginBottom: 48,
            }}>

              {/* España */}
              <div style={{
                padding: '22px 20px', borderRadius: 8,
                border: `1px solid ${C}18`,
                background: `${C}05`,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 18 }}>🇪🇸</span>
                  <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: D, border: `1px solid ${D}44`, padding: '2px 7px', borderRadius: 999 }}>España</span>
                </div>
                <div>
                  <div className="mn-serif" style={{ fontSize: 18, fontWeight: 400, marginBottom: 2 }}>Minuë Opticians</div>
                  <div style={{ fontSize: 11, opacity: 0.5, fontStyle: 'italic' }}>Sevilla, España</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12, fontWeight: 300 }}>
                  <a href="https://wa.me/34661018380" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 7, color: C, opacity: 0.8, textDecoration: 'none' }}>
                    <IconWA size={12} /> +34 661 018 380
                  </a>
                  <a href="mailto:hola@minueopticians.com" style={{ color: C, opacity: 0.8, textDecoration: 'none' }}>
                    hola@minueopticians.com
                  </a>
                  <a href="https://minueopticians.com" target="_blank" rel="noreferrer" style={{ color: D, opacity: 0.9, textDecoration: 'none', fontSize: 11 }}>
                    minueopticians.com ↗
                  </a>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <a href="https://wa.me/34661018380?text=Hola%2C%20me%20interesa%20el%20cat%C3%A1logo%20Minu%C3%AB%20Wholesale" target="_blank" rel="noreferrer" style={{
                      flex: 1, padding: '9px 0', borderRadius: 6,
                      border: `1px solid ${C}28`, color: C, textDecoration: 'none',
                      fontSize: 11, fontWeight: 500, textAlign: 'center',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      background: `${C}08`,
                    }}>
                      <IconWA size={11} /> WhatsApp
                    </a>
                    <a href="mailto:hola@minueopticians.com?subject=Consulta%20Wholesale%20Minuë" style={{
                      flex: 1, padding: '9px 0', borderRadius: 6,
                      border: `1px solid ${C}28`, color: C, textDecoration: 'none',
                      fontSize: 11, fontWeight: 500, textAlign: 'center',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      background: `${C}08`,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>

              {/* Francia */}
              <div style={{
                padding: '22px 20px', borderRadius: 8,
                border: `1px solid ${C}18`,
                background: `${C}05`,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 18 }}>🇫🇷</span>
                  <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: D, border: `1px solid ${D}44`, padding: '2px 7px', borderRadius: 999 }}>France</span>
                </div>
                <div>
                  <div className="mn-serif" style={{ fontSize: 18, fontWeight: 400, marginBottom: 2 }}>MPM Diffusion</div>
                  <div style={{ fontSize: 11, opacity: 0.5, fontStyle: 'italic' }}>Toulouse Showroom</div>
                </div>
                <div style={{ fontSize: 11, opacity: 0.4, lineHeight: 1.4, fontWeight: 300 }}>
                  15 allée de Longueterre, Bat. 1, 2ème étage<br/>Montrabé, Midi-Pyrénées
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12, fontWeight: 300 }}>
                  <a href="https://wa.me/33677166421" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 7, color: C, opacity: 0.8, textDecoration: 'none' }}>
                    <IconWA size={12} /> +33 6 77 16 64 21
                  </a>
                  <a href="mailto:mpm.diffusion@outlook.fr" style={{ color: C, opacity: 0.8, textDecoration: 'none' }}>
                    mpm.diffusion@outlook.fr
                  </a>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <a href="https://wa.me/33677166421?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20catalogue%20Minu%C3%AB%20Wholesale" target="_blank" rel="noreferrer" style={{
                      flex: 1, padding: '9px 0', borderRadius: 6,
                      border: `1px solid ${C}28`, color: C, textDecoration: 'none',
                      fontSize: 11, fontWeight: 500, textAlign: 'center',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      background: `${C}08`,
                    }}>
                      <IconWA size={11} /> WhatsApp
                    </a>
                    <a href="mailto:mpm.diffusion@outlook.fr?subject=Commande%20Wholesale%20Minuë" style={{
                      flex: 1, padding: '9px 0', borderRadius: 6,
                      border: `1px solid ${C}28`, color: C, textDecoration: 'none',
                      fontSize: 11, fontWeight: 500, textAlign: 'center',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      background: `${C}08`,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>

              {/* Colombia / Latam */}
              <div style={{
                padding: '22px 20px', borderRadius: 8,
                border: `1px solid #00a65028`,
                background: 'rgba(0,166,80,0.04)',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 18 }}>🌎</span>
                  <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#00a650', border: '1px solid rgba(0,166,80,0.35)', padding: '2px 7px', borderRadius: 999 }}>LATAM</span>
                </div>
                <div>
                  <div className="mn-serif" style={{ fontSize: 18, fontWeight: 400, marginBottom: 2 }}>Minuë Colombia</div>
                  <div style={{ fontSize: 11, opacity: 0.5, fontStyle: 'italic' }}>Todo Latinoamérica</div>
                </div>
                <div style={{ fontSize: 11, opacity: 0.4, lineHeight: 1.4, fontWeight: 300 }}>
                  CRA 19a 85 69<br/>Bogotá, Colombia
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12, fontWeight: 300 }}>
                  <a href="https://wa.me/573227701800" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 7, color: C, opacity: 0.8, textDecoration: 'none' }}>
                    <IconWA size={12} /> +57 (322) 770-1800
                  </a>
                  <a href="mailto:hola@minueopticians.co" style={{ color: C, opacity: 0.8, textDecoration: 'none' }}>
                    hola@minueopticians.co
                  </a>
                  <a href="https://minueopticians.co" target="_blank" rel="noreferrer" style={{ color: '#00a650', opacity: 0.9, textDecoration: 'none', fontSize: 11 }}>
                    minueopticians.co ↗
                  </a>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <a href="mailto:hola@minueopticians.co?subject=Consulta%20Wholesale%20Minuë%20LATAM" style={{
                      flex: 1, padding: '9px 0', borderRadius: 6,
                      border: '1px solid rgba(0,166,80,0.3)', color: C, textDecoration: 'none',
                      fontSize: 11, fontWeight: 500, textAlign: 'center',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      background: 'rgba(0,166,80,0.08)',
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Email
                    </a>
                    <a href="https://wa.me/573227701800?text=Hola%2C%20me%20interesa%20el%20cat%C3%A1logo%20Minu%C3%AB%20Wholesale" target="_blank" rel="noreferrer" style={{
                      flex: 1, padding: '9px 0', borderRadius: 6,
                      border: '1px solid rgba(0,166,80,0.3)', color: C, textDecoration: 'none',
                      fontSize: 11, fontWeight: 500, textAlign: 'center',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      background: 'rgba(0,166,80,0.12)',
                    }}>
                      <IconWA size={11} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Resto del mundo */}
              <div style={{
                padding: '22px 20px', borderRadius: 8,
                border: `1px solid ${C}18`,
                background: `${C}05`,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 18 }}>🌍</span>
                  <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: D, border: `1px solid ${D}44`, padding: '2px 7px', borderRadius: 999 }}>Internacional</span>
                </div>
                <div>
                  <div className="mn-serif" style={{ fontSize: 18, fontWeight: 400, marginBottom: 2 }}>Minuë Opticians</div>
                  <div style={{ fontSize: 11, opacity: 0.5, fontStyle: 'italic' }}>Resto del mundo · Rest of the world</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12, fontWeight: 300 }}>
                  <a href="https://wa.me/34661018380?text=Hello%2C%20I%20am%20interested%20in%20the%20Minu%C3%AB%20Wholesale%20catalogue" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 7, color: C, opacity: 0.8, textDecoration: 'none' }}>
                    <IconWA size={12} /> +34 661 018 380
                  </a>
                  <a href="mailto:hola@minueopticians.com" style={{ color: C, opacity: 0.8, textDecoration: 'none' }}>
                    hola@minueopticians.com
                  </a>
                  <a href="https://minueopticians.com" target="_blank" rel="noreferrer" style={{ color: D, opacity: 0.9, textDecoration: 'none', fontSize: 11 }}>
                    minueopticians.com ↗
                  </a>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <a href="https://wa.me/34661018380?text=Hello%2C%20I%20am%20interested%20in%20the%20Minu%C3%AB%20Wholesale%20catalogue" target="_blank" rel="noreferrer" style={{
                      flex: 1, padding: '9px 0', borderRadius: 6,
                      border: `1px solid ${C}28`, color: C, textDecoration: 'none',
                      fontSize: 11, fontWeight: 500, textAlign: 'center',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      background: `${C}08`,
                    }}>
                      <IconWA size={11} /> WhatsApp
                    </a>
                    <a href="mailto:hola@minueopticians.com?subject=Wholesale%20Enquiry%20Minu%C3%AB" style={{
                      flex: 1, padding: '9px 0', borderRadius: 6,
                      border: `1px solid ${C}28`, color: C, textDecoration: 'none',
                      fontSize: 11, fontWeight: 500, textAlign: 'center',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      background: `${C}08`,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA alternativo footer */}
            <div style={{
              marginBottom: 40, padding: '32px 28px', borderRadius: 8,
              background: `rgba(248,239,230,0.06)`, border: `1px solid rgba(248,239,230,0.12)`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
            }}>
              <div>
                <h4 className="mn-serif" style={{ fontSize: 22, fontWeight: 300, margin: '0 0 6px', color: C }}>
                  {t('ft_cta_h')}
                </h4>
                <p style={{ fontSize: 12, opacity: 0.55, margin: 0, fontWeight: 300 }}>{t('ft_cta_d')}</p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href="https://wa.me/34661018380?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20el%20cat%C3%A1logo%20Minu%C3%AB" target="_blank" rel="noreferrer" style={{
                  padding: '10px 18px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: CHOCOLATE, color: C, textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                }}>
                  <IconWA size={13} /> {t('ft_cta_wa')}
                </a>
                <a href="mailto:hola@minueopticians.com?subject=Consulta%20Wholesale%20Minu%C3%AB" style={{
                  padding: '10px 18px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                  border: `1px solid rgba(248,239,230,0.22)`, color: C, textDecoration: 'none',
                }}>
                  {t('ft_cta_email')}
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              paddingTop: 28, borderTop: `1px solid ${C}1a`,
              display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
              fontSize: 11, opacity: 0.55, letterSpacing: 0.3,
            }}>
              <span>{t('ft_copyright')}</span>
              <span className="mn-serif-i" style={{ fontSize: 13 }}>{t('ft_tagline')}</span>
            </div>
          </div>
        </footer>

        {/* MOBILE STICKY BAR */}
        <MobileStickyBar
          cartCount={cartCount}
          cartTotal={cartTotal}
          discountPct={discountPct}
          onOpenPanel={() => setPanelOpen(true)}
        />

        {/* FAB */}
        {cartCount > 0 && !panelOpen && (
          <button onClick={() => setPanelOpen(true)} className="mn-fab" style={{
            position: 'fixed', bottom: 22, right: 22, zIndex: 50,
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 20px', borderRadius: 999, background: G, color: C,
            boxShadow: '0 14px 36px -12px rgba(24,51,47,0.5)',
            fontSize: 13, fontWeight: 500, letterSpacing: 0.3,
          }}>
            <IconBag size={18} />
            <span>{t('panel_mi_pedido')}</span>
            <span style={{
              minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999,
              background: D, color: G, fontSize: 11, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>{cartCount}</span>
          </button>
        )}

        {/* TOAST cuando se añade un producto */}
        {toast && (
          <div style={{
            position: 'fixed', bottom: cartCount > 0 ? 88 : 28, left: '50%',
            transform: 'translateX(-50%)', zIndex: 55,
            background: G, color: C,
            padding: '10px 18px', borderRadius: 999,
            fontSize: 12, fontWeight: 500, letterSpacing: 0.3,
            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', gap: 8,
            animation: 'mn-rise 0.2s ease-out both',
            whiteSpace: 'nowrap',
          }}>
            <IconCheck size={13} />
            <span><strong>{toast.name}</strong> {t('toast_added')}</span>
          </div>
        )}

        {/* BOTTOM SHEET filtros móvil */}
        {filtersOpen && (
          <>
            <div onClick={() => setFiltersOpen(false)} className="mn-overlay" style={{
              position: 'fixed', inset: 0, background: 'rgba(24,51,47,0.45)',
              backdropFilter: 'blur(2px)', zIndex: 60,
            }} />
            <div className="mn-panel-bottom" style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 61,
              background: C, borderRadius: '14px 14px 0 0',
              padding: '24px 20px 32px',
              boxShadow: '0 -8px 32px -10px rgba(0,0,0,0.2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 className="mn-serif" style={{ fontSize: 24, fontWeight: 300, margin: 0 }}>{t('filters_title')}</h3>
                <button onClick={() => setFiltersOpen(false)} style={{
                  width: 34, height: 34, borderRadius: 999, border: `1px solid ${G}22`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}><IconClose size={16} /></button>
              </div>
              <div className="mn-label-xs" style={{ opacity: 0.5, marginBottom: 10 }}>{t('filter_shape')}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {SHAPES.map(sh => {
                  const active = activeShapes.includes(sh.id);
                  return (
                    <button key={sh.id} onClick={() => toggleShape(sh.id)} className="mn-pill" style={{
                      padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                      border: `1px solid ${active ? G : `${G}22`}`,
                      background: active ? `${G}12` : 'transparent',
                    }}>{t(sh.tKey)}</button>
                  );
                })}
              </div>
              <div className="mn-label-xs" style={{ opacity: 0.5, marginBottom: 10 }}>{t('filter_color')}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {COLOR_FILTERS.map(cf => {
                  const active = activeColors.includes(cf.id);
                  return (
                    <button key={cf.id} onClick={() => toggleColor(cf.id)} className="mn-pill" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '8px 12px 8px 9px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                      border: `1px solid ${active ? G : `${G}22`}`,
                      background: active ? `${G}12` : 'transparent',
                    }}>
                      <span style={{ width: 10, height: 10, borderRadius: 999, background: COLOR_DOTS[cf.id] || '#999', flexShrink: 0 }} />
                      {t(cf.tKey)}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { setActiveShapes([]); setActiveColors([]); setFiltersOpen(false); }} style={{
                width: '100%', padding: '13px', borderRadius: 4, border: `1px solid ${G}33`,
                fontSize: 13, fontWeight: 500, background: 'transparent', color: G, cursor: 'pointer',
              }}>{t('filter_clear')}</button>
            </div>
          </>
        )}
        {scrollY > 400 && (
          <button
            onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="mn-fab"
            style={{
              position: 'fixed',
              bottom: cartCount > 0 && !panelOpen ? 82 : 22,
              right: 22, zIndex: 49,
              width: 48, height: 48, borderRadius: 999,
              background: G,
              border: 'none',
              boxShadow: '0 8px 24px -6px rgba(24,51,47,0.45)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
              transition: 'bottom 0.3s ease',
              color: C,
            }}
            aria-label="Volver arriba"
          >
            {/* Flecha arriba */}
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="1,7 6,1 11,7" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Sol */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2"  x2="12" y2="5"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
              <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34"/>
              <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
              <line x1="2"  y1="12" x2="5"  y2="12"/>
              <line x1="19" y1="12" x2="22" y2="12"/>
              <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
              <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
            </svg>
          </button>
        )}

        {/* SIDE PANEL */}
        {panelOpen && (
          <OrderPanel
            t={t} lang={lang}
            region={region} setRegion={setRegion}
            distributor={distributor}
            cartItems={cartItems} cartCount={cartCount}
            currentTier={currentTier} nextTier={nextTier}
            unitPrice={unitPrice} cartTotal={cartTotal}
            familyCode={familyCode} setFamilyCode={setFamilyCode}
            discountPct={discountPct}
            onClose={() => setPanelOpen(false)}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onSendWA={sendWhatsApp}
            onSendEmail={sendEmail}
          />
        )}

        {/* QUICK VIEW MODAL */}
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            allProducts={PRODUCTS}
            colData={COLLECTIONS.find(c => c.id === quickViewProduct.col)}
            currentTierPrice={unitPrice}
            onClose={() => setQuickViewProduct(null)}
            cart={cart}
            onAddAny={(id) => addToCart(id)}
            t={t}
          />
        )}

        {/* MODAL TARIFAS */}
        {tarifasOpen && (
          <TarifasModal t={t} onClose={() => setTarifasOpen(false)} currentTier={currentTier} />
        )}
      </div>
    </>
  );
}

// ============================================================
// LangSelector
// ============================================================
function LangSelector({ lang, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  const current = LANGS.find(l => l.code === lang) || LANGS[0];

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="mn-pill mn-nav-pill"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '9px 12px', border: `1px solid ${open ? G : `${G}33`}`,
          borderRadius: 999, fontSize: 12, fontWeight: 500, letterSpacing: 0.3,
          background: open ? `${G}08` : 'transparent',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        aria-label="Language"
        aria-expanded={open}
      >
        <IconGlobe size={13} />
        <span className="mn-nav-text">{current.label}</span>
        <span style={{
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          lineHeight: 0,
        }}>
          <IconChevron size={10} />
        </span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 45,
          background: C, border: `1px solid ${G}22`, borderRadius: 10,
          boxShadow: '0 12px 32px -10px rgba(24,51,47,0.28)',
          padding: 6, minWidth: 160,
          display: 'flex', flexDirection: 'column', gap: 2,
          animation: 'mn-rise 0.18s ease-out both',
        }}>
          {LANGS.map(l => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => { onChange(l.code); setOpen(false); }}
                style={{
                  padding: '9px 13px', textAlign: 'left', borderRadius: 6,
                  fontSize: 12, fontWeight: active ? 600 : 400,
                  background: active ? `${G}10` : 'transparent',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = `${G}06`; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <span>{l.name}</span>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 2,
                  color: active ? D : `${G}66`, textTransform: 'uppercase',
                }}>{l.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// OrderPanel
// ============================================================
function OrderPanel({
  t, lang, region, setRegion, distributor,
  cartItems, cartCount, currentTier, nextTier, unitPrice, cartTotal,
  familyCode, setFamilyCode, discountPct,
  onClose, onUpdateQty, onRemove, onSendWA, onSendEmail,
}) {
  const isDistributor = distributor.name !== 'Minuë Opticians';
  // Estados: null = CTAs, 'wa'/'email' = lead form post-envío, 'sent' = confirmación
  const [step, setStep] = useState(null); // null | 'lead_wa' | 'lead_email' | 'sent'
  const [sentChannel, setSentChannel] = useState(null);
  const refName  = useRef(null);
  const refStore = useRef(null);
  const refEmail = useRef(null);

  // Enviar inmediatamente, luego mostrar lead form opcional
  const handleWA = () => {
    onSendWA({});
    setSentChannel('wa');
    setStep('sent');
  };

  const handleEmail = () => {
    onSendEmail({});
    setSentChannel('email');
    setStep('sent');
  };

  // Desde confirmación, enviar datos opcionales
  const handleLeadSave = () => {
    const lf = {
      name:  refName.current?.value  || '',
      store: refStore.current?.value || '',
      email: refEmail.current?.value || '',
    };
    if (!lf.name && !lf.store && !lf.email) { setStep(null); return; }
    // Re-enviar con datos de contacto incluidos
    if (sentChannel === 'wa') onSendWA(lf);
    else onSendEmail(lf);
    setStep(null);
  };

  // Cálculos
  const cost = cartItems.reduce((sum, item) => {
    const col = COLLECTIONS.find(c => c.id === item.col);
    const itemCost = col?.unitCost ?? unitPrice ?? DISPLAY_PRICE;
    return sum + itemCost * item.qty;
  }, 0);
  const revenue = cartItems.reduce((sum, item) => {
    const col = COLLECTIONS.find(c => c.id === item.col);
    return sum + (col?.rrp ?? 50) * item.qty;
  }, 0);
  const gainEur = revenue - cost;
  const gainPct = revenue > 0 ? Math.round((gainEur / revenue) * 100) : 0;
  const totalCost = discountPct > 0 ? cost * (1 - discountPct / 100) : cost;
  const hasItems = cartItems.length > 0;
  const hasUrgent = cartItems.some(item => PRODUCTS.find(p => p.id === item.id)?.urgency === 'stock_low');

  return (
    <>
      <div onClick={onClose} className="mn-overlay" style={{
        position: 'fixed', inset: 0, background: 'rgba(24,51,47,0.45)',
        backdropFilter: 'blur(3px)', zIndex: 60,
      }} />
      <aside className="mn-panel" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(440px, 94vw)', background: C, zIndex: 61,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-24px 0 60px -20px rgba(0,0,0,0.28)',
      }}>

        {/* ── Cabecera ── */}
        <div style={{
          padding: '20px 24px 14px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: `1px solid ${G}14`,
          background: hasUrgent ? `rgba(232,90,0,0.04)` : 'transparent',
        }}>
          <div>
            <div className="mn-label" style={{ color: D, marginBottom: 3 }}>{t('panel_eyebrow')}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <h3 className="mn-serif" style={{ fontSize: 26, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>
                {t('panel_h3')}
              </h3>
              {cartCount > 0 && (
                <span style={{
                  fontSize: 11, fontWeight: 700, background: G, color: C,
                  padding: '2px 8px', borderRadius: 999,
                }}>{cartCount} uds</span>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 34, height: 34, borderRadius: 999, display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center', border: `1px solid ${G}22`,
          }}><IconClose /></button>
        </div>

        {/* ── Lista de productos ── */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {!hasItems ? (
            <div style={{ padding: '60px 28px', textAlign: 'center', opacity: 0.6 }}>
              <p className="mn-serif-i" style={{ fontSize: 22, marginBottom: 10 }}>{t('panel_empty_t')}</p>
              <p style={{ fontSize: 13, lineHeight: 1.5, fontWeight: 300 }}>{t('panel_empty_d')}</p>
            </div>
          ) : (
            cartItems.map(item => {
              const prod = PRODUCTS.find(p => p.id === item.id);
              const isLow = prod?.urgency === 'stock_low';
              return (
                <div key={item.id} style={{
                  display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 12,
                  padding: '14px 20px', alignItems: 'center',
                  borderBottom: `1px solid ${G}10`,
                  background: isLow ? 'rgba(232,90,0,0.03)' : 'transparent',
                }}>
                  <div style={{
                    width: 64, height: 50, background: '#fff', borderRadius: 3,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 5, overflow: 'hidden', border: `1px solid ${G}0a`,
                  }}>
                    {item.img
                      ? <img src={item.img} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      : <svg width="28" height="18" viewBox="0 0 42 28" fill="none" style={{ opacity: 0.2 }}><rect x="1" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/><rect x="25" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/><line x1="17" y1="10" x2="25" y2="10" stroke={G} strokeWidth="1.5"/></svg>
                    }
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="mn-label-xs" style={{ opacity: 0.45, marginBottom: 1 }}>{item.col}</div>
                    <div className="mn-serif" style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                      <span style={{ fontSize: 11, opacity: 0.6 }}>
                        {item.qty} × {unitPrice != null ? `${unitPrice.toFixed(2).replace('.', ',')}€` : '—'}
                      </span>
                      {isLow && <span style={{ fontSize: 8, fontWeight: 700, color: '#e85a00', letterSpacing: 0.5 }}>⚡ POCAS UDS</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                      {unitPrice != null ? `${(item.qty * unitPrice).toFixed(2).replace('.', ',')}€` : '—'}
                    </span>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 1, border: `1px solid ${G}1e`, borderRadius: 999, padding: 2 }}>
                      <button onClick={() => onUpdateQty(item.id, -1)} style={{ width: 22, height: 22, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>−</button>
                      <span style={{ minWidth: 18, textAlign: 'center', fontSize: 12, fontWeight: 600 }}>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} style={{ width: 22, height: 22, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>+</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* ── Zona inferior con totales y CTA ── */}
          {hasItems && (
          <div style={{ padding: '16px 20px 24px', background: C }}>

            {/* Tramo actual + siguiente */}
            <div style={{
              padding: '10px 14px', borderRadius: 6,
              background: `${G}08`, marginBottom: 10,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div className="mn-label-xs" style={{ color: D, marginBottom: 1 }}>{t('panel_tier')}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{currentTier?.label || '—'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="mn-label-xs" style={{ opacity: 0.5, marginBottom: 1 }}>{t('panel_price')}</div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em' }}>
                  {unitPrice != null ? `${unitPrice.toFixed(2).replace('.', ',')}€` : t('panel_consult')}
                  <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.5, marginLeft: 2 }}>/ud</span>
                </div>
              </div>
            </div>

            {/* Nudge siguiente tramo */}
            {nextTier && (
              <div style={{
                marginBottom: 12, padding: '8px 12px', borderRadius: 6,
                background: `${D}0c`, border: `1px dashed ${D}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
              }}>
                <span style={{ fontSize: 11, lineHeight: 1.35 }}>
                  {t('panel_add_more_a')} <strong style={{ color: D }}>{nextTier.min - cartCount}</strong> {t('panel_add_more_b')} <strong style={{ color: D }}>{nextTier.price.toFixed(2).replace('.', ',')}€</strong>
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: G,
                  background: `${D}28`, padding: '2px 7px', borderRadius: 999, flexShrink: 0,
                }}>
                  {t('panel_savings')} {((unitPrice - nextTier.price) * (cartCount + (nextTier.min - cartCount))).toFixed(0)}€
                </span>
              </div>
            )}

            {/* ── TOTAL ── gran número, claro, accionable */}
            <div style={{
              padding: '16px 18px',
              background: G, color: C, borderRadius: 8,
              marginBottom: 10,
            }}>
              {/* Fila arriba: label + unidades */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase', opacity: 0.55 }}>
                  Total pedido
                </span>
                <span style={{ fontSize: 10, opacity: 0.55 }}>{cartCount} {t('panel_units')}</span>
              </div>

              {/* Número grande con descuento aplicado */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{
                  fontSize: 42, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                  {discountPct > 0
                    ? (cost * (1 - discountPct / 100)).toFixed(2).replace('.', ',')
                    : cost.toFixed(2).replace('.', ',')}
                </span>
                <span style={{ fontSize: 20, fontWeight: 700, opacity: 0.65, fontFamily: 'DM Sans, sans-serif' }}>€</span>
                {discountPct > 0 && (
                  <span style={{ fontSize: 13, textDecoration: 'line-through', opacity: 0.4, fontFamily: 'DM Sans', marginLeft: 4 }}>
                    {cost.toFixed(2).replace('.', ',')}€
                  </span>
                )}
              </div>

              {/* Condiciones */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {currentTier?.freeShip && (
                  <span style={{ fontSize: 10, fontWeight: 600, color: D }}>
                    ✓ Envío incluido
                  </span>
                )}
                <span style={{ fontSize: 10, opacity: 0.55 }}>
                  🔓 Sin pago previo
                </span>
                {currentTier?.payments && currentTier.payments !== 'Pago único' && (
                  <span style={{ fontSize: 10, opacity: 0.55 }}>
                    · {currentTier.payments}
                  </span>
                )}
              </div>

              {/* Separador */}
              <div style={{ height: 1, background: 'rgba(248,239,230,0.12)', margin: '10px 0' }} />

              {/* Opción C: Pagas → Vendes → Ganas */}
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.4, marginBottom: 8 }}>
                Retorno de inversión a PVP
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {[
                  { label: 'Pagas', value: `${totalCost.toFixed(2).replace('.', ',')}€`, sub: `${cartCount} uds`, highlight: false },
                  { label: 'Vendes', value: `~${revenue.toFixed(0)}€`, sub: 'a PVP rec.', highlight: false },
                  { label: 'Ganas', value: `+${gainEur.toFixed(0)}€`, sub: `~${gainPct}% margen`, highlight: true },
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <div style={{
                      flex: 1, textAlign: 'center', padding: '6px 0',
                      background: item.highlight ? `${D}22` : 'transparent',
                      borderRadius: item.highlight ? 4 : 0,
                    }}>
                      <div style={{ fontSize: 8, opacity: 0.45, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                      <div style={{
                        fontSize: item.highlight ? 16 : 14, fontWeight: 700,
                        fontFamily: 'DM Sans, sans-serif',
                        color: item.highlight ? D : C,
                        letterSpacing: '-0.02em',
                      }}>{item.value}</div>
                      <div style={{ fontSize: 8, opacity: 0.45, marginTop: 2 }}>{item.sub}</div>
                    </div>
                    {i < 2 && (
                      <div style={{ fontSize: 10, opacity: 0.3, padding: '0 2px', flexShrink: 0 }}>›</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Código de descuento */}
            <div style={{
              padding: '10px 14px', marginBottom: 10, borderRadius: 6,
              border: `1px solid ${discountPct > 0 ? D : G}22`,
              background: discountPct > 0 ? `${D}08` : `${G}04`,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{ flex: 1 }}>
                <div className="mn-label-xs" style={{ color: discountPct > 0 ? D : G, opacity: discountPct > 0 ? 1 : 0.5, marginBottom: 4 }}>
                  {t('code_label')}
                </div>
                <input
                  type="text"
                  placeholder={t('code_placeholder')}
                  value={familyCode}
                  onChange={e => setFamilyCode(e.target.value)}
                  style={{
                    width: '100%', background: 'transparent', border: 'none', outline: 'none',
                    fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
                    color: discountPct > 0 ? D : G, letterSpacing: 0.5,
                    textTransform: 'uppercase',
                  }}
                />
              </div>
              {familyCode.trim().length > 0 && (
                <div style={{
                  fontSize: 10, fontWeight: 700,
                  color: discountPct > 0 ? D : '#e85a00',
                  flexShrink: 0,
                }}>
                  {discountPct > 0 ? t('code_applied') : t('code_invalid')}
                </div>
              )}
            </div>

            {/* Región */}
            <div style={{
              padding: '10px 14px', marginBottom: 10, borderRadius: 6,
              border: `1px solid ${region === 'latam' ? '#00a650' : G}22`,
              background: region === 'latam' ? 'rgba(0,166,80,0.05)' : isDistributor ? `${D}08` : `${G}04`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <label className="mn-label-xs" style={{ color: region === 'latam' ? '#00a650' : D }}>
                  {t('panel_region_label')}
                </label>
                <select className="mn-select" value={region} onChange={e => setRegion(e.target.value)} style={{
                  padding: '5px 28px 5px 9px', border: `1px solid ${G}33`, borderRadius: 999,
                  fontSize: 11, fontWeight: 500, background: C, color: G,
                  fontFamily: 'inherit', cursor: 'pointer',
                }}>
                  {REGIONS.map(r => (
                    <option key={r.id} value={r.id}>{r.flag} {r.label[lang] || r.label.es}</option>
                  ))}
                </select>
              </div>
              {region === 'latam' ? (
                <div style={{ fontSize: 10, color: '#00a650', fontWeight: 600 }}>
                  🌎 {t('latam_badge')} · hola@minueopticians.co
                </div>
              ) : isDistributor ? (
                <div style={{ fontSize: 10, opacity: 0.65 }}>
                  <IconInfo size={10} /> {distributor.name}{distributor.contact ? ` · ${distributor.contact}` : ''}
                </div>
              ) : (
                <div style={{ fontSize: 10, opacity: 0.6 }}>{t('panel_region_hint_default')}</div>
              )}
            </div>

            {/* ── CTAs ── */}

            {/* Estado: CTAs principales */}
            {step === null && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                {/* 1. WhatsApp — PRINCIPAL */}
                <button onClick={handleWA} className="mn-btn" style={{
                  width: '100%', padding: '16px 18px', borderRadius: 6,
                  background: CHOCOLATE, color: C,
                  fontSize: 14, fontWeight: 700, letterSpacing: 0.3,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: `0 4px 20px -6px ${CHOCOLATE}80`,
                }}>
                  <IconWA size={18} />
                  Enviar pedido por WhatsApp
                </button>
                <div style={{ textAlign: 'center', fontSize: 10, opacity: 0.4, marginTop: -2 }}>
                  Respuesta en menos de 24h · Sin compromiso de pago
                </div>

                {/* 2. Email — secundario */}
                <button onClick={handleEmail} className="mn-btn" style={{
                  width: '100%', padding: '12px 18px', borderRadius: 6,
                  background: 'transparent', color: G, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${G}33`, letterSpacing: 0.2,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                  {t('panel_email')}
                </button>

                {/* 3. PDF — terciario */}
                <button
                  onClick={() => generatePDF({ cartItems, cartCount, cartTotal, unitPrice, currentTier, distributor, region, lang, t, discountPct, cost, gainEur, gainPct })}
                  className="mn-btn"
                  style={{
                    width: '100%', padding: '10px 18px', borderRadius: 6,
                    background: 'transparent', color: G, opacity: 0.65,
                    fontSize: 11, fontWeight: 400, border: `1px solid ${G}18`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                  Descargar PDF del pedido
                </button>

              </div>
            )}

            {/* Estado: Confirmación + lead form opcional */}
            {step === 'sent' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Check de éxito */}
                <div style={{
                  padding: '16px', borderRadius: 8,
                  background: `${G}08`, border: `1px solid ${G}18`,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>✓</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                    {sentChannel === 'wa' ? 'WhatsApp abierto' : 'Email preparado'}
                  </div>
                  <p style={{ fontSize: 11, opacity: 0.55, margin: 0, lineHeight: 1.5 }}>
                    Te confirmamos stock y plazos en menos de 24h.
                  </p>
                </div>

                {/* Lead form opcional */}
                <div style={{ borderTop: `1px solid ${G}10`, paddingTop: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 3 }}>
                    ¿Quieres que te hagamos seguimiento?
                  </div>
                  <p style={{ fontSize: 10, opacity: 0.5, margin: '0 0 10px', lineHeight: 1.5 }}>
                    Opcional — te avisamos de novedades y stock.
                  </p>
                  {[
                    { ref: refName, placeholder: t('lead_name'), type: 'text' },
                    { ref: refStore, placeholder: t('lead_store'), type: 'text' },
                    { ref: refEmail, placeholder: t('lead_email'), type: 'email' },
                  ].map((field, i) => (
                    <input key={i} ref={field.ref} type={field.type} placeholder={field.placeholder}
                      style={{
                        width: '100%', padding: '10px 12px', marginBottom: 8,
                        border: `1.5px solid ${G}20`, borderRadius: 6,
                        fontSize: 12, fontFamily: 'inherit',
                        background: '#fff', color: G, outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  ))}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={handleLeadSave} className="mn-btn" style={{
                      flex: 1, padding: '11px 14px', borderRadius: 6,
                      background: G, color: C, fontSize: 12, fontWeight: 600,
                      border: 'none', cursor: 'pointer',
                    }}>
                      Guardar datos
                    </button>
                    <button onClick={() => setStep(null)} style={{
                      flex: 1, padding: '11px 14px', borderRadius: 6,
                      background: 'transparent', border: `1px solid ${G}22`,
                      fontSize: 11, opacity: 0.6, cursor: 'pointer', fontFamily: 'inherit', color: G,
                    }}>
                      No, gracias
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ============================================================
// TarifasBar
// ============================================================
function TarifasBar({ units, currentTier, nextTier, onOpenTarifas, t }) {
  const maxMark = 60;
  const pct = Math.min(100, (units / maxMark) * 100);
  const TIER_MARKS = [
    { m: 1,  label: '<10',   price: '22,90€' },
    { m: 10, label: '10–19', price: '21,90€' },
    { m: 20, label: '20–29', price: '19,90€' },
    { m: 30, label: '30–39', price: '18,90€' },
    { m: 40, label: '40–60', price: '17,90€' },
    { m: 61, label: '+60',   price: '—' },
  ];

  return (
    <div style={{
      padding: '20px 22px 16px', borderRadius: 4,
      border: `1px solid ${G}20`,
      background: `linear-gradient(180deg, ${C} 0%, rgba(184,134,11,0.04) 100%)`,
    }}>
      {/* Fila 1: estado actual + botón */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <span className="mn-label-xs" style={{ color: D }}>{t('bar_your_tier')}</span>
          {units === 0 ? (
            <span style={{ fontSize: 12, opacity: 0.6 }}>{t('bar_empty')}</span>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span className="mn-serif" style={{ fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1 }}>
                  {currentTier?.price != null ? currentTier.price.toFixed(2).replace('.', ',') : '—'}
                  <span style={{ fontSize: 13, opacity: 0.65, marginLeft: 3 }}>€/ud</span>
                </span>
                <span style={{ fontSize: 11, opacity: 0.4 }}>·</span>
                <span style={{ fontSize: 12, opacity: 0.7 }}>
                  vendes a <strong>50–69€</strong>
                </span>
                <span style={{ fontSize: 11, opacity: 0.4 }}>·</span>
                <span style={{
                  padding: '2px 8px', borderRadius: 999, background: `${D}1a`,
                  color: D, fontSize: 11, fontWeight: 700,
                }}>
                  ~{currentTier?.price != null ? Math.round(((50 - currentTier.price) / 50) * 100) : 0}% margen
                </span>
              </div>
              {nextTier && (
                <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>
                  {t('bar_missing_a')} <strong style={{ color: D }}>{nextTier.min - units}</strong> {t('bar_missing_b')} <strong>{nextTier.price.toFixed(2).replace('.', ',')}€</strong>
                </div>
              )}
            </>
          )}
        </div>
        <button onClick={onOpenTarifas} className="mn-btn" style={{
          padding: '8px 14px', borderRadius: 999, border: `1px solid ${D}`, color: D,
          fontSize: 11, fontWeight: 500, letterSpacing: 0.3,
          display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
        }}>
          <IconInfo size={12} /> {t('bar_rate_btn')}
        </button>
      </div>

      {/* Barra de progreso */}
      <div style={{ height: 6, background: `${G}15`, borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${D}, ${G})`,
          borderRadius: 999, transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Tramos — tabla compacta en lugar de texto absoluto */}
      <div style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto' }} className="mn-tabs-scroll">
        {TIER_MARKS.map(({ m, label, price }) => {
          const isActive = currentTier && m === currentTier.min;
          return (
            <div key={m} style={{
              flexShrink: 0, textAlign: 'center', padding: '4px 8px', borderRadius: 4,
              background: isActive ? `${D}18` : 'transparent',
            }}>
              <div style={{ fontSize: 9, fontWeight: isActive ? 700 : 400, opacity: isActive ? 1 : 0.5, marginBottom: 2, letterSpacing: 0.5 }}>{label}</div>
              <div style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? D : G, opacity: isActive ? 1 : 0.55 }}>{price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// TarifasModal
// ============================================================
function TarifasModal({ onClose, currentTier, t }) {
  return (
    <>
      <div onClick={onClose} className="mn-overlay" style={{
        position: 'fixed', inset: 0, background: 'rgba(24,51,47,0.55)',
        backdropFilter: 'blur(3px)', zIndex: 70,
      }} />
      <div className="mn-panel-bottom" style={{
        position: 'fixed', zIndex: 71,
        bottom: 0, left: 0, right: 0,
        maxHeight: '92vh', overflowY: 'auto',
        background: C, borderRadius: '14px 14px 0 0',
        padding: 'clamp(24px, 4vw, 40px)',
        boxShadow: '0 -24px 60px -20px rgba(0,0,0,0.3)',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            gap: 20, marginBottom: 30, flexWrap: 'wrap',
          }}>
            <div>
              <div className="mn-label" style={{ color: D, marginBottom: 10 }}>{t('modal_eyebrow')}</div>
              <h2 className="mn-serif" style={{
                fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300,
                letterSpacing: '-0.01em', margin: 0, lineHeight: 1.05,
              }}>
                {t('modal_h2_a')} <span className="mn-serif-i">{t('modal_h2_b')}</span>{t('modal_h2_c')}
              </h2>
            </div>
            <button onClick={onClose} style={{
              width: 40, height: 40, borderRadius: 999, display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center', border: `1px solid ${G}22`,
            }}><IconClose /></button>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12, marginBottom: 28,
          }}>
            {[...TIERS].reverse().map((tier, i) => {
              const isActive = currentTier && tier.min === currentTier.min;
              const isMostPopular = tier.min === 20;
              return (
                <div key={i} style={{
                  padding: '20px 18px', borderRadius: 4,
                  background: isActive ? G : isMostPopular ? `${D}12` : `${G}08`,
                  color: isActive ? C : G,
                  border: `1.5px solid ${isActive ? G : isMostPopular ? D : `${G}1a`}`,
                  position: 'relative',
                }}>
                  {isMostPopular && !isActive && (
                    <span style={{
                      position: 'absolute', top: -10, left: 14,
                      padding: '2px 10px', background: D, color: G,
                      fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                      borderRadius: 999, textTransform: 'uppercase',
                    }}>★ {t('tier_best')}</span>
                  )}
                  {isActive && (
                    <span style={{
                      position: 'absolute', top: -10, left: 14,
                      padding: '2px 10px', background: D, color: G,
                      fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                      borderRadius: 999, textTransform: 'uppercase',
                    }}>{t('modal_your_tier')}</span>
                  )}
                  <div className="mn-label-xs" style={{ color: isActive ? D : D, marginBottom: 8 }}>{tier.label} {t('panel_units')}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
                      {tier.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span style={{ fontSize: 15, opacity: 0.65 }}>€/ud</span>
                  </div>
                  {/* Savings vs base */}
                  {tier.price < 22.90 && (
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: isActive ? D : D,
                      background: isActive ? `${D}22` : `${D}14`,
                      padding: '2px 8px', borderRadius: 999, display: 'inline-block', marginBottom: 8,
                    }}>
                      {t('tier_save_label')}: −{((22.90 - tier.price) * tier.min).toFixed(0)}€ en {tier.min} uds
                    </div>
                  )}
                  <div style={{
                    fontSize: 11, opacity: isActive ? 0.85 : 0.7, lineHeight: 1.55,
                    marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3,
                  }}>
                    <span><strong style={{ opacity: 0.7 }}>{t('modal_payments')}</strong> {tier.payments}</span>
                    <span><strong style={{ opacity: 0.7 }}>{t('modal_expositor')}</strong> {tier.expositor}</span>
                    {tier.freeShip && <span style={{ color: isActive ? D : D, fontWeight: 500 }}>{t('modal_free_ship')}</span>}
                  </div>
                </div>
              );
            })}

            <div style={{
              padding: '20px 18px', borderRadius: 4,
              background: `linear-gradient(135deg, ${G}0d 0%, ${D}0d 100%)`,
              border: `1px dashed ${G}33`,
            }}>
              <div className="mn-label-xs" style={{ color: D, marginBottom: 8 }}>{t('modal_plus60_label')}</div>
              <div className="mn-serif-i" style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.1, marginBottom: 10 }}>
                {t('modal_plus60_t')}
              </div>
              <div style={{ fontSize: 11, opacity: 0.75, lineHeight: 1.55 }}>
                {t('modal_plus60_d')}{' '}
                <a href="mailto:minueopticians@gmail.com" style={{ color: D, textDecoration: 'underline' }}>minueopticians@gmail.com</a>
              </div>
            </div>
          </div>

          <div style={{
            padding: 20, borderRadius: 4, background: `${D}0f`, border: `1px solid ${D}33`,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16,
          }}>
            <div>
              <div className="mn-label-xs" style={{ color: D, marginBottom: 4 }}>{t('modal_early_t')}</div>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>{t('modal_early_d')}</div>
            </div>
            <div>
              <div className="mn-label-xs" style={{ color: D, marginBottom: 4 }}>{t('modal_rrp_t')}</div>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>{t('modal_rrp_d')}</div>
            </div>
            <div>
              <div className="mn-label-xs" style={{ color: D, marginBottom: 4 }}>{t('modal_ship_t')}</div>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>{t('modal_ship_d')}</div>
            </div>
          </div>

          <p style={{
            marginTop: 24, fontSize: 11, opacity: 0.55, textAlign: 'center',
            fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif",
          }}>
            {t('modal_footer')}
          </p>
          <p style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: D, margin: '4px 0 0', letterSpacing: 0.3 }}>
            📅 {t('tier_valid')}
          </p>
        </div>
      </div>
    </>
  );
}

// ============================================================
// QuickViewModal
// ============================================================
// ============================================================
// Fade helper
// ============================================================
function Fade({ children, d }) {
  const ref = React.useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(function () {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) setVis(true); });
    }, { threshold: 0.15 });
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${d || 0}s, transform 0.7s ease ${d || 0}s`,
    }}>
      {children}
    </div>
  );
}

// ============================================================
// GlobalMap — Presencia Global
// ============================================================
function GlobalMap({ t }) {
  const MAP_PTS = [
    [490,175],[510,155],[520,195],[495,155],[500,145],[510,175],
    [510,130],[455,210],[555,215],[470,140],
    [790,350],[810,370],[770,365],
    [280,285],
    [200,175],[160,190],[230,200],[185,155],[215,170],
  ];
  const SEVILLA = [470, 210];
  const COUNTRIES = ['Francia','España','Alemania','Italia','P.Bajos','Bélgica','Suiza','Dinamarca','Portugal','Grecia','R.Unido','Australia','Colombia','EE.UU.'];

  return (
    <section style={{ background: G, color: C, padding: 'clamp(50px,7vw,80px) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <Fade d={0}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
              color: D, fontWeight: 600, marginBottom: 14,
            }}>Presencia Global</div>
            <h2 className="mn-serif" style={{
              fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300,
              letterSpacing: '-0.01em', margin: 0, lineHeight: 1.05,
            }}>
              De{' '}<span className="mn-serif-i" style={{ color: D }}>Sevilla</span>{' '}al mundo
            </h2>
            <p className="mn-serif-i" style={{
              fontSize: 16, opacity: 0.35, marginTop: 10,
            }}>Solo en puntos de venta seleccionados</p>
          </div>
        </Fade>

        <Fade d={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <svg
              viewBox="0 0 960 480"
              style={{ width: '100%', maxWidth: 700, height: 'auto', display: 'block' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Continentes */}
              <g fill={C} fillOpacity="0.07" stroke={C} strokeWidth="0.5" strokeOpacity="0.05">
                <path d="M100,90 Q110,70 140,65 Q170,55 200,60 Q230,50 260,65 Q280,60 295,75 L305,90 Q295,100 280,115 L265,130 Q255,145 240,155 L225,165 Q215,175 200,190 L185,200 Q170,195 160,180 L145,165 Q130,150 120,135 Q110,120 105,105 Z" />
                <path d="M200,195 L215,215 Q220,230 230,240 L240,250 Q235,260 225,258 L215,250 Q208,242 203,228 Z" />
                <path d="M245,255 Q265,248 285,262 L305,280 Q315,300 312,330 L308,355 Q300,375 290,385 L278,392 Q268,388 262,368 L258,338 Q254,318 250,298 L245,275 Z" />
                <path d="M435,95 Q450,85 468,88 Q485,80 505,92 L525,100 Q545,108 555,125 L560,145 Q558,165 548,178 L535,190 Q520,200 500,205 L485,210 Q468,215 455,212 L445,205 Q440,188 443,168 L448,148 Q445,125 435,95 Z" />
                <path d="M445,105 Q448,95 458,98 L463,108 Q468,118 464,128 L456,134 Q450,130 445,120 Z" />
                <path d="M438,110 Q440,105 444,108 L445,115 Q443,120 440,118 Z" />
                <path d="M460,222 Q475,218 500,222 L520,230 Q540,248 548,270 L553,300 Q550,330 542,355 L530,375 Q518,388 502,392 L490,390 Q475,382 465,360 L458,330 Q452,300 450,270 L448,245 Q450,230 460,222 Z" />
                <path d="M560,180 Q575,175 590,185 L600,195 Q605,208 598,218 L585,225 Q575,222 568,212 L562,198 Z" />
                <path d="M590,75 Q625,65 665,78 Q700,68 740,82 L770,100 Q795,118 805,148 L812,170 Q805,192 785,202 L758,212 Q730,218 700,212 L672,205 Q650,195 632,178 L612,158 Q598,138 592,118 Z" />
                <path d="M720,215 Q735,210 748,218 L755,228 Q752,240 742,245 L730,242 Q722,235 720,225 Z" />
                <path d="M748,310 Q772,298 805,308 L828,322 Q840,338 835,362 L825,378 Q810,392 788,388 L768,378 Q752,362 748,342 Z" />
                <path d="M855,375 Q858,370 862,375 L863,382 Q860,386 857,382 Z" />
              </g>

              {/* Ecuador */}
              <line x1="40" y1="240" x2="920" y2="240" stroke={C} strokeWidth="0.3" opacity="0.04" strokeDasharray="4 8" />

              {/* Líneas curvas desde Sevilla */}
              {MAP_PTS.map(([px, py], i) => {
                const mx = (SEVILLA[0] + px) / 2;
                const my = Math.min(SEVILLA[1], py) - 20 - Math.abs(SEVILLA[0] - px) * 0.08;
                return (
                  <path key={i}
                    d={`M${SEVILLA[0]},${SEVILLA[1]} Q${mx},${my} ${px},${py}`}
                    fill="none" stroke={C} strokeWidth="0.4" opacity="0.1"
                  />
                );
              })}

              {/* Puntos destino */}
              {MAP_PTS.map(([px, py], i) => (
                <g key={i}>
                  <circle cx={px} cy={py} r="7" fill="none" stroke={C} strokeWidth="0.3" opacity="0.12" />
                  <circle cx={px} cy={py} r="3.5" fill={C} opacity="0.45" />
                </g>
              ))}

              {/* Glow Sevilla */}
              <defs>
                <radialGradient id="sevillaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={D} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={D} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={SEVILLA[0]} cy={SEVILLA[1]} r="40" fill="url(#sevillaGlow)" />
              <circle cx={SEVILLA[0]} cy={SEVILLA[1]} r="12" fill="none" stroke={D} strokeWidth="0.5" opacity="0.22" />
              <circle cx={SEVILLA[0]} cy={SEVILLA[1]} r="6" fill={D} opacity="0.85" />
              <text x={SEVILLA[0]} y={SEVILLA[1] - 14} textAnchor="middle"
                fill={D} fontSize="7" fontWeight="600" letterSpacing="2.5"
                fontFamily="'DM Sans', sans-serif"
              >SEVILLA</text>
            </svg>
          </div>
        </Fade>

        {/* Lista países */}
        <Fade d={0.4}>
          <div style={{
            marginTop: 28, paddingTop: 20,
            borderTop: `1px solid ${C}12`,
            display: 'flex', flexWrap: 'wrap',
            gap: '5px 14px', justifyContent: 'center',
          }}>
            {COUNTRIES.map((c, i) => (
              <span key={i} style={{
                fontSize: 10, opacity: 0.3, fontFamily: "'DM Sans', sans-serif",
                letterSpacing: 0.3,
              }}>
                {i > 0 && <span style={{ marginRight: 14, opacity: 0.4 }}>·</span>}
                {c}
              </span>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}


function QuickViewModal({ product: initialProduct, allProducts, colData: initialColData, currentTierPrice, onClose, cart, onAddAny, t }) {
  // Estado interno: el producto que se está viendo (cambia al clicar variantes)
  const [active, setActive] = useState(initialProduct);

  const colData = COLLECTIONS.find(c => c.id === active.col) || initialColData;
  const rrp = colData?.rrp ?? 50;
  const fixedCost = colData?.unitCost ?? null;
  const displayCost = fixedCost ?? currentTierPrice ?? DISPLAY_PRICE;
  const marginPct = Math.round(((rrp - displayCost) / rrp) * 100);
  const shapeObj = SHAPES.find(s => s.id === active.shape);
  const added = cart[active.id] || 0;

  // Variantes: todos los productos del mismo modelo (primer token del nombre)
  const baseModel = active.name.split(' ')[0];
  const variants = useMemo(() =>
    (allProducts || PRODUCTS).filter(p => p.name.split(' ')[0] === baseModel),
  [baseModel, allProducts]);
  const hasVariants = variants.length > 1;

  // El sufijo de color es el nombre menos el baseModel
  const colorSuffix = (name) => name.replace(baseModel, '').trim() || name;

  const [isNarrow, setIsNarrow] = useState(false);
  useLayoutEffect(function() {
    const check = () => setIsNarrow(window.innerWidth < 560);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset al abrir con un producto diferente
  useEffect(() => { setActive(initialProduct); }, [initialProduct.id]);

  return (
    <>
      <div onClick={onClose} className="mn-overlay" style={{
        position: 'fixed', inset: 0, background: 'rgba(24,51,47,0.55)',
        backdropFilter: 'blur(4px)', zIndex: 80,
      }} />
      <div style={{
        position: 'fixed', zIndex: 81,
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 'min(720px, 92vw)',
        maxHeight: '90vh',
        background: C, borderRadius: 10,
        boxShadow: '0 32px 80px -20px rgba(0,0,0,0.45)',
        animation: 'mn-rise 0.22s ease-out both',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* ── Cabecera con nombre del modelo + badge variantes ── */}
        <div style={{
          padding: isNarrow ? '14px 16px 10px' : '16px 22px 12px',
          borderBottom: `1px solid ${G}12`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <div>
              <div className="mn-label-xs" style={{ color: D, marginBottom: 2 }}>
                {t('qv_collection')} — {active.col}
                {active.col === 'Acetato' && <span style={{ marginLeft: 6, color: D, fontWeight: 700 }}>★</span>}
              </div>
              <h2 className="mn-serif" style={{
                fontSize: isNarrow ? 22 : 28, fontWeight: 300, margin: 0,
                letterSpacing: '-0.02em', lineHeight: 1.1, whiteSpace: 'nowrap',
              }}>{baseModel}</h2>
            </div>
            {hasVariants && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
                padding: '3px 9px', borderRadius: 999,
                background: `${G}0c`, border: `1px solid ${G}18`,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.5, opacity: 0.6 }}>
                  {variants.length} colores
                </span>
              </div>
            )}
          </div>
          <button onClick={onClose} style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: 999,
            border: `1px solid ${G}22`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', cursor: 'pointer',
          }}><IconClose size={16} /></button>
        </div>

        {/* ── Cuerpo: imagen + info — scrollable ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isNarrow ? '1fr' : 'minmax(0,1.05fr) 1fr',
          flex: 1, minHeight: 0,
          overflowY: isNarrow ? 'auto' : 'hidden',
        }}>
          {/* Imagen */}
          <div style={{
            background: active.img ? 'transparent' : `${G}06`,
            height: isNarrow ? 160 : 'auto',
            minHeight: isNarrow ? 'unset' : 450,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: isNarrow ? 10 : 16, position: 'relative',
            flexShrink: 0,
          }}>
            {active.urgency && (
              <span style={{
                position: 'absolute', top: 12, left: 12, zIndex: 2,
                padding: '3px 9px', borderRadius: 999, fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                background: active.urgency === 'stock_low' ? '#e85a00' : active.urgency === 'hot' ? '#c41e1e' : D,
                color: '#fff',
              }}>{t(URGENCY_LABELS[active.urgency])}</span>
            )}
            {active.img ? (
              <img
                key={active.id}
                src={active.img}
                alt={active.name}
                onClick={() => window.open(active.img.replace(/w_(600|800|900),/, 'w_1200,'), '_blank')}
                style={{
                  maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                  cursor: 'zoom-in',
                  animation: 'mn-fadein 0.2s ease-out both',
                }}
              />
            ) : (
              <div key={active.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.25,
                animation: 'mn-fadein 0.2s ease-out both',
              }}>
                <svg width="64" height="40" viewBox="0 0 42 28" fill="none">
                  <rect x="1" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/>
                  <rect x="25" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/>
                  <line x1="17" y1="10" x2="25" y2="10" stroke={G} strokeWidth="1.5"/>
                  <line x1="1" y1="10" x2="0" y2="14" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="41" y1="10" x2="42" y2="14" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 10, color: G, textTransform: 'uppercase', letterSpacing: 1 }}>{active.name}</span>
                <span style={{ fontSize: 9, color: G, opacity: 0.6 }}>Imagen próximamente</span>
              </div>
            )}
            {active.img && (
              <div style={{
                position: 'absolute', bottom: 8, right: 8,
                fontSize: 8, color: G, opacity: 0.3, letterSpacing: 0.3,
                display: 'flex', alignItems: 'center', gap: 3, pointerEvents: 'none',
              }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                Ampliar
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ padding: isNarrow ? '14px 16px 0' : '20px 22px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: isNarrow ? 'visible' : 'auto' }}>

            {/* Nombre variante activa + forma */}
            <div>
              <div className="mn-serif" style={{ fontSize: isNarrow ? 18 : 21, fontWeight: 400, lineHeight: 1.2, animation: 'mn-fadein 0.18s ease-out both' }}>
                {colorSuffix(active.name)}
              </div>
              {shapeObj && (
                <span style={{ fontSize: 9, opacity: 0.4, letterSpacing: 0.5, fontWeight: 500, textTransform: 'uppercase' }}>
                  {t(shapeObj.tKey)}
                </span>
              )}
            </div>

            {/* Precio + margen */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ padding: '7px 11px', background: `${G}08`, borderRadius: 4, flex: '1 1 70px' }}>
                <div className="mn-label-xs" style={{ opacity: 0.5, marginBottom: 2 }}>{t('qv_rrp')}</div>
                <div className="mn-serif" style={{ fontSize: 19, fontWeight: 400 }}>{rrp}€</div>
              </div>
              <div style={{ padding: '7px 11px', background: `${D}12`, borderRadius: 4, flex: '1 1 70px' }}>
                <div className="mn-label-xs" style={{ color: D, marginBottom: 2 }}>{t('margin_label')}</div>
                <div className="mn-serif" style={{ fontSize: 19, fontWeight: 400 }}>~{marginPct}%</div>
              </div>
            </div>

            {/* Dots de colores de la variante activa */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {active.colors.map((c, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '3px 8px', border: `1px solid ${G}1a`, borderRadius: 999, fontSize: 10,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: COLOR_DOTS[c] || '#999', flexShrink: 0 }} />
                  {c}
                </span>
              ))}
            </div>

            {/* CTA — solo visible en desktop dentro del panel info */}
            {!isNarrow && (
              <button
                onClick={() => { onAddAny(active.id); }}
                className="mn-btn"
                style={{
                  padding: '12px 18px', borderRadius: 4, marginTop: 4,
                  background: added ? `${G}18` : G,
                  color: added ? G : C,
                  border: `1px solid ${G}`,
                  fontSize: 13, fontWeight: 500, letterSpacing: 0.3,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {added ? (<><IconCheck size={13} /> {t('qv_added')} ({added})</>) : (<><IconPlus /> {t('qv_add')}</>)}
              </button>
            )}

          </div>
        </div>

        {/* ── Selector de variantes ── */}
        {hasVariants && (
          <div style={{
            borderTop: `1px solid ${G}12`,
            padding: isNarrow ? '12px 14px 14px' : '14px 22px 18px',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 9, letterSpacing: 0.5, fontWeight: 600, textTransform: 'uppercase', opacity: 0.45 }}>
                Otras opciones de {baseModel}
              </span>
              <div style={{ flex: 1, height: 1, background: `${G}12` }} />
            </div>
            <div style={{
              display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2,
              scrollbarWidth: 'none',
            }}>
              {variants.map((v) => {
                const isActive = v.id === active.id;
                const inCart = cart[v.id] || 0;
                const suffix = colorSuffix(v.name);
                return (
                  <button
                    key={v.id}
                    onClick={() => setActive(v)}
                    style={{
                      flexShrink: 0, padding: '10px 14px',
                      borderRadius: 6, border: isActive ? `1.5px solid ${G}` : `1px solid ${G}20`,
                      background: isActive ? `${G}08` : 'transparent',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'border-color 0.15s, background 0.15s, transform 0.12s',
                      minWidth: 126, maxWidth: 182,
                      position: 'relative',
                    }}
                  >
                    {/* Imagen mini o placeholder */}
                    <div style={{
                      width: '100%', aspectRatio: '1/1',
                      background: v.img ? 'transparent' : `${G}06`,
                      borderRadius: 3, marginBottom: 8, overflow: 'hidden',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {v.img ? (
                        <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} />
                      ) : (
                        <svg width="28" height="18" viewBox="0 0 42 28" fill="none" style={{ opacity: 0.2 }}>
                          <rect x="1" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/>
                          <rect x="25" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/>
                          <line x1="17" y1="10" x2="25" y2="10" stroke={G} strokeWidth="1.5"/>
                        </svg>
                      )}
                    </div>
                    {/* Dots de colores */}
                    <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
                      {v.colors.slice(0, 3).map((c, i) => (
                        <span key={i} style={{
                          width: 6, height: 6, borderRadius: 999,
                          background: COLOR_DOTS[c] || '#999',
                          border: c === 'beige' || c === 'crema' ? `1px solid ${G}33` : 'none',
                        }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, color: G, lineHeight: 1.2 }}>{suffix}</div>
                    {inCart > 0 && (
                      <div style={{
                        position: 'absolute', top: 5, right: 5,
                        width: 14, height: 14, borderRadius: 999,
                        background: G, color: C,
                        fontSize: 8, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{inCart}</div>
                    )}
                    {isActive && (
                      <div style={{
                        position: 'absolute', bottom: 5, right: 5,
                        width: 12, height: 12, borderRadius: 999,
                        background: G, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="7" height="7" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Botón sticky móvil */}
        {isNarrow && (
          <div style={{
            padding: '12px 16px', borderTop: `1px solid ${G}12`,
            background: C, flexShrink: 0,
          }}>
            <button
              onClick={() => { onAddAny(active.id); }}
              className="mn-btn"
              style={{
                width: '100%', padding: '14px 18px', borderRadius: 6,
                background: added ? `${G}18` : G,
                color: added ? G : C,
                border: `1px solid ${G}`,
                fontSize: 14, fontWeight: 600, letterSpacing: 0.3,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {added ? (<><IconCheck size={14} /> {t('qv_added')} ({added})</>) : (<><IconPlus /> {t('qv_add')}</>)}
            </button>
          </div>
        )}

      </div>
    </>
  );
}


// ============================================================
// FaqSection
// ============================================================
// ── ImpactSection — Stats + Proceso unificados, diseño editorial 2026 ─
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatNumber({ raw }) {
  // Parse: "+250" → prefix="+", num=250, suffix=""
  //        "56+"  → prefix="", num=56, suffix="+"
  //        "6+"   → prefix="", num=6,  suffix="+"
  //        "14"   → prefix="", num=14, suffix=""
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prefix = raw.startsWith('+') ? '+' : '';
  const suffix = raw.endsWith('+') ? '+' : '';
  const numStr = raw.replace(/[^0-9]/g, '');
  const num = parseInt(numStr, 10);
  const counted = useCountUp(num, 1600, visible);

  return (
    <span ref={ref} className="mn-serif" style={{
      fontSize: 'clamp(30px,4vw,48px)', fontWeight: 300,
      letterSpacing: '-0.035em', lineHeight: 1,
      color: 'rgba(248,239,230,1)',
    }}>
      {visible ? `${prefix}${counted}${suffix}` : raw}
    </span>
  );
}

function ImpactSection({ t }) {
  const stats = [
    { n: '+250', label: 'ciudades' },
    { n: '14',   label: 'países' },
    { n: '6+',   label: 'años' },
    { n: '56+',  label: 'modelos' },
    { n: '163+', label: 'productos' },
  ];

  const steps = [
    { n: 1, title: 'Explora',       sub: 'Añade al carrito lo que te interese. Sin registro.' },
    { n: 2, title: 'Envíanos',      sub: 'Envía tu lista por WhatsApp o email. Sin pagar.' },
    { n: 3, title: 'Confirmamos',   sub: 'Stock, precio y plazos confirmados en menos de 24h.' },
  ];

  return (
    <div>
      {/* ── BLOQUE OSCURO: stats ── */}
      <div style={{ background: G, color: C }}>

        {/* Ticker SS26 */}
        <div style={{
          borderBottom: `1px solid rgba(248,239,230,0.08)`,
          padding: '9px 24px', textAlign: 'center',
        }}>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', opacity: 0.45 }}>
            🌿 &nbsp;Temporada SS26 abierta &nbsp;·&nbsp; Nuevos modelos disponibles &nbsp;·&nbsp; Stock limitado en referencias marcadas
          </span>
        </div>

        {/* Stats grid */}
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          padding: '0 24px',
        }} className="mn-impact-grid">
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: 'clamp(18px,3vw,30px) clamp(12px,2vw,24px)',
              borderRight: i < 4 ? `1px solid rgba(248,239,230,0.1)` : 'none',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 5,
            }}>
              <StatNumber raw={s.n} />
              <span style={{
                fontSize: 9, opacity: 0.4,
                letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600,
              }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BLOQUE CREMA: proceso en 3 cards ── */}
      <div style={{
        background: `${G}05`,
        borderBottom: `1px solid ${G}0e`,
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: 'clamp(20px,3vw,28px) 24px',
        }}>
          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 'clamp(14px,2vw,20px)',
          }}>
            <span style={{
              fontSize: 8, fontWeight: 700, letterSpacing: 2.2,
              textTransform: 'uppercase', opacity: 0.35,
            }}>Cómo funciona</span>
            <div style={{ flex: 1, height: 1, background: `${G}12` }} />
            <span style={{ fontSize: 9, opacity: 0.3 }}>Sin pago previo</span>
          </div>

          {/* 3 steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(8px,2vw,16px)',
          }} className="mn-steps-grid">
            {steps.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: 'clamp(12px,2vw,16px)',
                borderRadius: 6,
                background: i === 1 ? `${D}0e` : `rgba(24,51,47,0.04)`,
                border: `1px solid ${i === 1 ? `${D}28` : `${G}0e`}`,
              }}>
                {/* Número */}
                <div style={{
                  width: 26, height: 26, borderRadius: 999, flexShrink: 0,
                  background: i === 1 ? D : `${G}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 1,
                }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: i === 1 ? G : G }}>{s.n}</span>
                </div>
                {/* Texto */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.1, marginBottom: 3, lineHeight: 1.2 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.5, lineHeight: 1.5, fontWeight: 300 }}>
                    {s.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .mn-impact-grid { grid-template-columns: repeat(3,1fr) !important; }
          .mn-impact-grid > div:nth-child(3) { border-right: none !important; }
          .mn-impact-grid > div { border-bottom: 1px solid rgba(248,239,230,0.08) !important; }
          .mn-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── SocialProofStrip (kept for reference, replaced by ImpactSection) ──
function SocialProofStrip({ t }) { return null; }

// ── HowItWorks (kept for reference, replaced by ImpactSection) ────────
function HowItWorks({ t }) { return null; }




// ── FaireRating — Bloque valoraciones Faire ──────────────────────────
function FaireRating() {
  const FAIRE_LOGO = (
    <svg width="28" height="28" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="white"/>
      <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="58" fontWeight="400" fill="#111">F</text>
    </svg>
  );

  const stars = 4.8;
  const reviews = 53;

  return (
    <div style={{
      background: C,
      borderTop: `1px solid ${G}0e`,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(28px,4vw,44px) 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
      }}>

        {/* Left: badge + claim */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Faire logo */}
          <div style={{
            width: 52, height: 52, borderRadius: 10,
            border: `1.5px solid ${G}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#fff', flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            {FAIRE_LOGO}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3, opacity: 0.9 }}>Faire Wholesale</span>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: 0.8,
                background: `${D}18`, color: D, border: `1px solid ${D}30`,
                padding: '1px 7px', borderRadius: 999,
              }}>TOP SHOP</span>
            </div>
            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.floor(stars) ? D : i <= stars ? D : 'none'} stroke={D} strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em' }}>{stars}</span>
              <span style={{ fontSize: 11, opacity: 0.45 }}>({reviews} reseñas)</span>
            </div>
          </div>
        </div>

        {/* Center: pills de confianza */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { icon: '🇪🇸', text: '3–4 días España' },
            { icon: '🇪🇺', text: '3–6 días Europa' },
            { icon: '🌍', text: '6–9 días internacional' },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 999,
              border: `1px solid ${G}14`, background: `${G}04`,
              fontSize: 11, fontWeight: 400,
            }}>
              <span style={{ fontSize: 12 }}>{p.icon}</span>
              <span style={{ opacity: 0.7 }}>{p.text}</span>
            </div>
          ))}
        </div>

        {/* Right: CTA */}
        <a
          href="https://minueopticians.faire.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 6,
            background: G, color: C,
            fontSize: 12, fontWeight: 600, letterSpacing: 0.3,
            textDecoration: 'none', flexShrink: 0,
            transition: 'opacity 0.15s',
          }}
        >
          Pedir en Faire
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </a>

      </div>
    </div>
  );
}

// ── FaireBlock ───────────────────────────────────────────────────────
function FaireBlock({ t }) {
  return (
    <div style={{
      background: `${G}05`, borderTop: `1px solid ${G}0e`, borderBottom: `1px solid ${G}0e`,
      padding: '14px 24px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 11, opacity: 0.6 }}>¿Prefieres pedir a través de una plataforma conocida?</span>
        <a
          href="https://minueopticians.faire.com"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 11, fontWeight: 700, color: D, letterSpacing: 0.5,
            border: `1px solid ${D}55`, padding: '4px 14px', borderRadius: 999,
            textDecoration: 'none',
          }}
        >
          También en Faire →
        </a>
      </div>
    </div>
  );
}

// ── Datos reales de clientes ─────────────────────────────────────────
const REAL_CLIENTS = [
  { store: 'Kefi Concept Store',                city: 'Πειραιάς',   country: 'Grecia' },
  { store: 'La Source',                         city: 'Stari Grad',  country: 'Croacia' },
  { store: 'Emmy Moa Atelier-Boutique',         city: 'Pénestin',   country: 'Francia' },
  { store: 'Chapeau Hüte & Accessoires',        city: 'Murnau',     country: 'Alemania' },
  { store: 'SIL',                               city: 'Harlingen',  country: 'Países Bajos' },
  { store: 'Mrs Goodwill',                      city: 'Köln',       country: 'Alemania' },
  { store: 'Sous Les Pins',                     city: 'Hyères',     country: 'Francia' },
  { store: 'Creammy',                           city: 'Syrovice',   country: 'Rep. Checa' },
  { store: 'Dowse',                             city: 'Brighton',   country: 'Reino Unido' },
  { store: 'Penso Davide Artstudiomurano',      city: 'Venezia',    country: 'Italia' },
  { store: 'Péttalos',                          city: 'Consuegra',  country: 'España' },
  { store: 'Tiny House Menorca',                city: 'Maó',        country: 'España' },
];

// ── ClientTicker — banda animada con clientes reales ─────────────────
function ClientTicker({ t }) {
  const items = [...REAL_CLIENTS, ...REAL_CLIENTS]; // doble para loop infinito
  return (
    <div style={{
      background: G, color: C, overflow: 'hidden',
      padding: '9px 0', borderBottom: `1px solid rgba(248,239,230,0.08)`,
    }}>
      <div style={{
        display: 'flex', gap: 0,
        animation: 'mn-ticker 38s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {items.map((c, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0 28px', flexShrink: 0,
            fontSize: 10, fontWeight: 400,
          }}>
            <span style={{ color: D, fontSize: 8 }}>✦</span>
            <span style={{ fontWeight: 600, opacity: 0.8 }}>{c.store}</span>
            <span style={{ opacity: 0.35 }}>·</span>
            <span style={{ opacity: 0.45 }}>{c.city}, {c.country}</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes mn-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

// ── RecentClients — grid de últimos pedidos ───────────────────────────
function RecentClients() {
  const FLAG = { 'España':'🇪🇸','Francia':'🇫🇷','Alemania':'🇩🇪','Italia':'🇮🇹','Reino Unido':'🇬🇧','Países Bajos':'🇳🇱','Grecia':'🇬🇷','Croacia':'🇭🇷','Rep. Checa':'🇨🇿' };
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px,5vw,60px) 24px' }} className="mn-reveal">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 'clamp(20px,3vw,32px)' }}>
        <div>
          <div className="mn-label-xs" style={{ color: D, marginBottom: 6 }}>Comunidad</div>
          <h3 className="mn-serif" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 300, margin: 0, letterSpacing: '-0.02em' }}>
            Últimas tiendas que confían en Minuë<span style={{ color: D }}>.</span>
          </h3>
        </div>
        <span style={{ fontSize: 11, opacity: 0.45, fontStyle: 'italic' }}>Pedidos recientes via Faire</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 8,
      }}>
        {REAL_CLIENTS.map((c, i) => (
          <div key={i} style={{
            padding: '12px 14px',
            border: `1px solid ${G}12`,
            borderRadius: 6,
            background: i % 3 === 1 ? `${G}04` : 'transparent',
            display: 'flex', flexDirection: 'column', gap: 3,
            transition: 'border-color 0.15s, background 0.15s',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.25, color: G }}>{c.store}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 11 }}>{FLAG[c.country] || '🌍'}</span>
              <span style={{ fontSize: 10, opacity: 0.5, fontWeight: 300 }}>{c.city} · {c.country}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



// ── MobileStickyBar ───────────────────────────────────────────────────
function MobileStickyBar({ cartCount, cartTotal, discountPct, onOpenPanel }) {
  if (cartCount === 0) return null;
  return (
    <div className="mn-mobile-sticky" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 55,
      background: G, color: C,
      padding: '12px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      boxShadow: '0 -8px 24px -8px rgba(24,51,47,0.35)',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 11, opacity: 0.65 }}>Mi selección</span>
        <span style={{ fontSize: 13, fontWeight: 700 }}>{cartCount} uds</span>
        {cartTotal && <span style={{ fontSize: 13, color: D, fontWeight: 700 }}>{cartTotal.toFixed(2).replace('.', ',')}€</span>}
      </div>
      <button onClick={onOpenPanel} style={{
        padding: '10px 20px', borderRadius: 999,
        background: D, color: G, fontSize: 12, fontWeight: 700,
        border: 'none', cursor: 'pointer', letterSpacing: 0.3,
      }}>
        Enviar pedido →
      </button>
    </div>
  );
}

// ── FaqSection ────────────────────────────────────────────────────────

function FaqSection({ t }) {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(prev => prev === i ? null : i);

  const questions = [1,2,3,4,5,6,7].map(i => ({
    q: t(`faq_q${i}`),
    a: t(`faq_a${i}`),
  }));

  return (
    <section id="faq" className="mn-reveal" style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px', scrollMarginTop: 80 }}>
      <div style={{ marginBottom: 36 }}>
        <div className="mn-label-xs" style={{ color: D, marginBottom: 8 }}>{t('faq_eyebrow')}</div>
        <h2 className="mn-serif" style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 300, margin: 0, letterSpacing: '-0.02em' }}>
          {t('faq_h2')}<span style={{ color: D }}>.</span>
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {questions.map((item, i) => (
          <div key={i} style={{
            borderBottom: `1px solid ${G}15`,
            overflow: 'hidden',
          }}>
            <button
              onClick={() => toggle(i)}
              style={{
                width: '100%', textAlign: 'left', background: 'none', border: 'none',
                padding: '18px 4px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                cursor: 'pointer',
              }}
            >
              <span className="mn-serif" style={{ fontSize: 17, fontWeight: 400, color: G, lineHeight: 1.3 }}>
                {item.q}
              </span>
              <span style={{
                flexShrink: 0, width: 24, height: 24,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 999, border: `1px solid ${G}22`,
                fontSize: 15, color: open === i ? D : G,
                transition: 'color 0.2s, transform 0.2s',
                transform: open === i ? 'rotate(45deg)' : 'none',
              }}>+</span>
            </button>
            {open === i && (
              <div className="mn-faq-answer" style={{
                padding: '0 4px 20px',
                fontSize: 14, lineHeight: 1.65, color: G, opacity: 0.75,
              }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, added, onAdd, rank, showRank, variant = 'normal', isNew, colData, currentTierPrice, onQuickView, t }) {
  const p = product;
  const isTop = variant === 'top';
  const shapeObj = SHAPES.find(s => s.id === p.shape);

  // Pricing display
  const rrp = colData?.rrp ?? 50;
  const fixedCost = colData?.unitCost ?? null;
  const displayCost = fixedCost ?? currentTierPrice ?? DISPLAY_PRICE;
  const marginEur = rrp - displayCost;
  const marginPct = Math.round((marginEur / rrp) * 100);

  return (
    <div className="mn-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="mn-card-img" style={{
        position: 'relative', aspectRatio: '1/1', background: 'transparent',
        borderRadius: 2, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {p.img ? (
          <img src={p.img} alt={p.name} className="mn-img" style={{
            width: '100%', height: '100%', objectFit: 'contain', padding: '8px',
          }} />
        ) : (
          <div className="mn-img" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8, opacity: 0.35,
          }}>
            <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/>
              <rect x="25" y="4" width="16" height="12" rx="6" stroke={G} strokeWidth="1.5"/>
              <line x1="17" y1="10" x2="25" y2="10" stroke={G} strokeWidth="1.5"/>
              <line x1="1" y1="10" x2="0" y2="14" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="41" y1="10" x2="42" y2="14" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 9, letterSpacing: 1, color: G, fontFamily: 'DM Sans', textTransform: 'uppercase', fontWeight: 500 }}>{p.name}</span>
          </div>
        )}

        {/* Badges izquierda — rank / new / urgency */}
        <div style={{
          position: 'absolute', top: 8, left: 8,
          display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start',
        }}>
          {showRank && rank && (
            <span style={{
              padding: '2px 7px', borderRadius: 999,
              background: rank <= 3 ? D : `${G}cc`,
              color: rank <= 3 ? G : C,
              fontSize: 8, fontWeight: 700, letterSpacing: 1.2,
            }}>№{rank.toString().padStart(2, '0')}</span>
          )}
          {isNew && !showRank && (
            <span style={{
              padding: '2px 7px', borderRadius: 999,
              background: D, color: G,
              fontSize: 8, fontWeight: 700, letterSpacing: 1.2,
            }}>{t('new_badge')}</span>
          )}
          {p.urgency && !showRank && !isNew && (
            <span style={{
              padding: '2px 7px', borderRadius: 999,
              background: URGENCY_COLORS[p.urgency] || D, color: '#fff',
              fontSize: 8, fontWeight: 700, letterSpacing: 1,
            }}>{t(URGENCY_LABELS[p.urgency])}</span>
          )}
        </div>

        {/* Badge derecha — colección, Acetato con estilo dorado distintivo */}
        <div style={{
          position: 'absolute', top: 8, right: 8,
        }}>
          {p.col === 'Acetato' ? (
            <span style={{
              padding: '2px 8px', borderRadius: 999,
              background: `${D}22`, border: `1px solid ${D}66`,
              fontSize: 7, fontWeight: 700, letterSpacing: 0.8,
              textTransform: 'uppercase', color: D,
            }}>Acetato</span>
          ) : (
            <span style={{
              padding: '2px 7px', border: `1px solid ${G}22`, borderRadius: 999,
              background: 'rgba(248,239,230,0.88)', fontSize: 7, fontWeight: 600,
              letterSpacing: 0.5, textTransform: 'uppercase', color: G,
            }}>{p.col}</span>
          )}
        </div>

        {/* Botón + Info — hover en desktop, siempre visible en móvil */}
        {onQuickView && (
          <button onClick={(e) => { e.stopPropagation(); onQuickView(p); }}
            style={{
              position: 'absolute', bottom: 8, right: 8,
              padding: '5px 10px', borderRadius: 999,
              background: 'rgba(248,239,230,0.92)', backdropFilter: 'blur(4px)',
              border: `1px solid ${G}22`, fontSize: 9, fontWeight: 600,
              letterSpacing: 0.5, textTransform: 'uppercase', color: G,
              opacity: 0, transition: 'opacity 0.2s',
            }}
            className="mn-qv-btn"
          >
            + Info
          </button>
        )}
      </div>

      <div className="mn-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div className="mn-card-price-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
          <div style={{ minWidth: 0 }}>
            <h4 className="mn-serif mn-card-title" style={{
              fontSize: isTop ? 19 : 17, fontWeight: 800, lineHeight: 1.2, margin: 0,
              letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{p.name}</h4>
            {shapeObj && (
              <span style={{
                fontSize: 9, opacity: 0.45, letterSpacing: 0.5, fontWeight: 500,
                textTransform: 'uppercase', display: 'block', marginTop: 2,
              }}>{t(shapeObj.tKey)}</span>
            )}
          </div>
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            {/* Margen primero, PVP diferenciado por colección */}
            <div style={{
              padding: '2px 7px', borderRadius: 999,
              background: `rgba(24,51,47,0.07)`, display: 'inline-flex',
              alignItems: 'center', gap: 3, marginBottom: 2,
            }}>
              <span style={{ fontSize: 8, opacity: 0.55, fontWeight: 500, textTransform: 'uppercase' }}>{t('margin_label')}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: G }}>~{marginPct}%</span>
            </div>
            <div className="mn-card-price-badge" style={{ display: 'flex', alignItems: 'baseline', gap: 3, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 8, opacity: 0.45, letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 500 }}>{t('pvp_label')}</span>
              <span className="mn-serif" style={{ fontSize: 13, fontWeight: 400, opacity: 0.7 }}>{rrp}€</span>
              {p.col === 'Acetato' && (
                <span style={{
                  fontSize: 7, fontWeight: 700, color: D, letterSpacing: 0.8,
                  background: `${D}14`, padding: '1px 5px', borderRadius: 999, marginLeft: 1,
                }}>ACE</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {p.colors.slice(0, 4).map((c, i) => (
            <span key={i} style={{
              width: 7, height: 7, borderRadius: 999,
              background: COLOR_DOTS[c] || '#999',
              border: c === 'beige' || c === 'rosa' ? `1px solid ${G}33` : 'none',
            }} />
          ))}
        </div>

        <button
          onClick={() => onAdd()}
          className="mn-btn mn-card-btn"
          style={{
            marginTop: 4, alignSelf: 'stretch',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            padding: '8px 10px', borderRadius: 999,
            background: added ? G : 'transparent',
            color: added ? C : G,
            border: `1px solid ${added ? G : `${G}44`}`,
            fontSize: 10.5, fontWeight: 500, letterSpacing: 0.2,
          }}
        >
          {added ? (<><IconCheck size={11} /> {t('panel_added')} ({added})</>) : (<><IconPlus /> {t('panel_add')}</>)}
        </button>
      </div>
    </div>
  );
}
