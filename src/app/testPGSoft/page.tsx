"use client"
import React, { useEffect, useState } from 'react'
import md5 from "md5";
import Cookies from 'js-cookie';
import axios from 'axios';

// const games = [
//     {
//         "name": "Honey Trap of Diao Chan",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "diaochan",
//         "providerCode": "1",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687083129_583559.png",
//         "rank": 1
//     },
//     {
//         "name": "Gem Saviour",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "gem-saviour",
//         "providerCode": "2",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686728444_878373.png",
//         "rank": 2
//     },
//     {
//         "name": "Fortune Gods",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fortune-gods",
//         "providerCode": "3",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677468409_722936.png",
//         "rank": 3
//     },
//     {
//         "name": "Anubis Wrath",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "anubis-wrath",
//         "providerCode": "1623475",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675101913_509110.png",
//         "rank": 5
//     },
//     {
//         "name": "Medusa II",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "medusa2",
//         "providerCode": "6",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686632674_514520.png",
//         "rank": 6
//     },
//     {
//         "name": "Medusa",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "medusa",
//         "providerCode": "7",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686681438_800476.png",
//         "rank": 7
//     },
//     {
//         "name": "Fortune Rabbit",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fortune-rabbit",
//         "providerCode": "1543462",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677542493_56053.png",
//         "rank": 8
//     },
//     {
//         "name": "Super Golf Drive",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "spr-golf-drive",
//         "providerCode": "1513328",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670768812_902369.png",
//         "rank": 9
//     },
//     {
//         "name": "Songkran Splash",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "songkran-splash",
//         "providerCode": "1448762",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734676400306_27638.png",
//         "rank": 10
//     },
//     {
//         "name": "Bakery Bonanza",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "bakery-bonanza",
//         "providerCode": "1418544",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671800043_824226.png",
//         "rank": 13
//     },
//     {
//         "name": "Rave Party Fever",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "rave-party-fvr",
//         "providerCode": "1420892",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680743761_683133.png",
//         "rank": 14
//     },
//     {
//         "name": "Mystical Spirits",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "myst-spirits",
//         "providerCode": "1432733",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737437098528_536924.png",
//         "rank": 15,
//         "locale": {
//             "en": "Mystical Spirits",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Midas Fortune",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "midas-fortune",
//         "providerCode": "1402846",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686523729_538144.png",
//         "rank": 16
//     },
//     {
//         "name": "Hood vs Wolf",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "hood-wolf",
//         "providerCode": "18",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687126310_588171.png",
//         "rank": 18
//     },
//     {
//         "name": "Hawaiian Tiki",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "hawaiian-tiki",
//         "providerCode": "1381200",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686827879_945556.png",
//         "rank": 19
//     },
//     {
//         "name": "Reel Love",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "reel-love",
//         "providerCode": "20",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680691513_104157.png",
//         "rank": 20
//     },
//     {
//         "name": "Diner Delights",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "diner-delights",
//         "providerCode": "1372643",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1681836894378_86618.png",
//         "rank": 21
//     },
//     {
//         "name": "Alchemy Gold",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "alchemy-gold",
//         "providerCode": "1368367",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670800898_349423.png",
//         "rank": 22
//     },
//     {
//         "name": "Asgardian Rising",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "asgardian-rs",
//         "providerCode": "1340277",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671779115_434551.png",
//         "rank": 23
//     },
//     {
//         "name": "Win Win Won",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "win-win-won",
//         "providerCode": "24",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675152421_324705.png",
//         "rank": 24
//     },
//     {
//         "name": "Plushie Frenzy",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "plushie-frenzy",
//         "providerCode": "25",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734681023043_64883.png",
//         "rank": 25
//     },
//     {
//         "name": "Tree of Fortune",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fortune-tree",
//         "providerCode": "26",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675687126_449503.png",
//         "rank": 26
//     },
//     {
//         "name": "Totem Wonders",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "totem-wonders",
//         "providerCode": "1338274",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675726718_33433.png",
//         "rank": 27
//     },
//     {
//         "name": "Hotpot",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "hotpot",
//         "providerCode": "28",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687141505_755766.png",
//         "rank": 28
//     },
//     {
//         "name": "Dragon Legend",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "dragon-legend",
//         "providerCode": "29",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674263331_867746.png",
//         "rank": 29
//     },
//     {
//         "name": "Prosperity Fortune Tree",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "prosper-ftree",
//         "providerCode": "1312883",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680969935_681066.png",
//         "rank": 30
//     },
//     {
//         "name": "Baccarat Deluxe",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "baccarat-deluxe",
//         "providerCode": "31",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/slot_202007171255575757.png",
//         "rank": 31
//     },
//     {
//         "name": "Chicky Run",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "chicky-run",
//         "providerCode": "1738001",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675002274_563832.png",
//         "rank": 32
//     },
//     {
//         "name": "Hip Hop Panda",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "hip-hop-panda",
//         "providerCode": "33",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686840442_471843.png",
//         "rank": 33
//     },
//     {
//         "name": "Legend of Hou Yi",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "legend-of-hou-yi",
//         "providerCode": "34",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687369939_510321.png",
//         "rank": 34
//     },
//     {
//         "name": "Hallow-Win",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "mr-hallow-win",
//         "providerCode": "35",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686473669_758448.png",
//         "rank": 35
//     },
//     {
//         "name": "Prosperity Lion",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "prosperity-lion",
//         "providerCode": "36",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680915903_912620.png",
//         "rank": 36
//     },
//     {
//         "name": "Santa's Gift Rush",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "santas-gift-rush",
//         "providerCode": "37",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680538925_184604.png",
//         "rank": 37
//     },
//     {
//         "name": "Gem Saviour Sword",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "gem-saviour-sword",
//         "providerCode": "38",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686743763_889775.png",
//         "rank": 38
//     },
//     {
//         "name": "Piggy Gold",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "piggy-gold",
//         "providerCode": "39",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734681078603_193871.png",
//         "rank": 39
//     },
//     {
//         "name": "Jungle Delight",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "jungle-delight",
//         "providerCode": "40",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687518654_397136.png",
//         "rank": 40
//     },
//     {
//         "name": "Symbols of Egypt",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "symbols-of-egypt",
//         "providerCode": "41",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675990968_219675.png",
//         "rank": 41
//     },
//     {
//         "name": "Ganesha Gold",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "ganesha-gold",
//         "providerCode": "42",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686606327_827214.png",
//         "rank": 42
//     },
//     {
//         "name": "Emperor's Favour",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "emperors-favour",
//         "providerCode": "44",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677372725_733231.png",
//         "rank": 44
//     },
//     {
//         "name": "Wild Ape #3258",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "wild-ape-3258",
//         "providerCode": "1508783",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674656014_41129.png",
//         "rank": 45
//     },
//     {
//         "name": "Cash Mania",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "cash-mania",
//         "providerCode": "1682240",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1710230768525_820820.png",
//         "rank": 46
//     },
//     {
//         "name": "Gemstones Gold",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "gemstones-gold",
//         "providerCode": "1671262",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1709028474546_426303.png",
//         "rank": 47
//     },
//     {
//         "name": "Double Fortune",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "double-fortune",
//         "providerCode": "48",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674192409_174657.png",
//         "rank": 48
//     },
//     {
//         "name": "Fortune Dragon",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fortune-dragon",
//         "providerCode": "1695365",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674807769_226265.png",
//         "rank": 49
//     },
//     {
//         "name": "Journey to the Wealth",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "journey-to-the-wealth",
//         "providerCode": "50",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687494140_297588.png",
//         "rank": 50
//     },
//     {
//         "name": "Dragon Hatch2",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "dragon-hatch2",
//         "providerCode": "1451122",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674940910_198956.png",
//         "rank": 51
//     },
//     {
//         "name": "Werewolf's Hunt",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "werewolf-hunt",
//         "providerCode": "1615454",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1704172618890_445690.png",
//         "rank": 52
//     },
//     {
//         "name": "The Great Icescape",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "the-great-icescape",
//         "providerCode": "53",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675847316_992588.png",
//         "rank": 53
//     },
//     {
//         "name": "Captain's Bounty",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "captains-bounty",
//         "providerCode": "54",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734673959239_458351.png",
//         "rank": 54
//     },
//     {
//         "name": "Tsar Treasures",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "tsar-treasures",
//         "providerCode": "1655268",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1702890036085_932667.png",
//         "rank": 55
//     },
//     {
//         "name": "Mafia Mayhem",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "mafia-mayhem",
//         "providerCode": "1580541",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1701704456998_523523.png",
//         "rank": 56
//     },
//     {
//         "name": "Dragon Hatch",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "dragon-hatch",
//         "providerCode": "57",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674240095_19935.png",
//         "rank": 57
//     },
//     {
//         "name": "Vampire's Charm",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "vampires-charm",
//         "providerCode": "58",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675623701_405834.png",
//         "rank": 58
//     },
//     {
//         "name": "Ninja vs Samurai",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "ninja-vs-samurai",
//         "providerCode": "59",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686231191_239877.png",
//         "rank": 59
//     },
//     {
//         "name": "Leprechaun Riches",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "leprechaun-riches",
//         "providerCode": "60",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687158903_678882.png",
//         "rank": 60
//     },
//     {
//         "name": "Flirting Scholar",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "flirting-scholar",
//         "providerCode": "61",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677406566_517564.png",
//         "rank": 61
//     },
//     {
//         "name": "Gem Saviour Conquest",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "gem-saviour-conquest",
//         "providerCode": "62",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686756663_281335.png",
//         "rank": 62
//     },
//     {
//         "name": "Dragon Tiger Luck",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "dragon-tiger-luck",
//         "providerCode": "63",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677294296_442821.png",
//         "rank": 63
//     },
//     {
//         "name": "Muay Thai Champion",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "muay-thai-champion",
//         "providerCode": "64",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686431150_343850.png",
//         "rank": 64
//     },
//     {
//         "name": "Mahjong Ways",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "mahjong-ways",
//         "providerCode": "65",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686952976_78997.png",
//         "rank": 65
//     },
//     {
//         "name": "Forge of Wealth",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "forge-wealth",
//         "providerCode": "1555350",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1700464830199_256894.png",
//         "rank": 66
//     },
//     {
//         "name": "Shaolin Soccer",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "shaolin-soccer",
//         "providerCode": "67",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734676472164_853581.png",
//         "rank": 67
//     },
//     {
//         "name": "Fortune Mouse",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fortune-mouse",
//         "providerCode": "68",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677491515_189898.png",
//         "rank": 68
//     },
//     {
//         "name": "Bikini Paradise",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "bikini-paradise",
//         "providerCode": "69",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671861217_268438.png",
//         "rank": 69
//     },
//     {
//         "name": "Candy Burst",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "candy-burst",
//         "providerCode": "70",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734673922600_390147.png",
//         "rank": 70
//     },
//     {
//         "name": "Caishen Wins",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "cai-shen-wins",
//         "providerCode": "71",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671909973_698466.png",
//         "rank": 71
//     },
//     {
//         "name": "Ultimate Striker",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "ult-striker",
//         "providerCode": "1489936",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670139874_653430.png",
//         "rank": 72
//     },
//     {
//         "name": "Egypt's Book of Mystery",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "egypts-book-mystery",
//         "providerCode": "73",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677336755_917950.png",
//         "rank": 73
//     },
//     {
//         "name": "Mahjong Ways 2",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "mahjong-ways2",
//         "providerCode": "74",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686891685_118630.png",
//         "rank": 74
//     },
//     {
//         "name": "Ganesha Fortune",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "ganesha-fortune",
//         "providerCode": "75",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686644722_385853.png",
//         "rank": 75
//     },
//     {
//         "name": "Gladiator's Glory",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "gladi-glory",
//         "providerCode": "1572362",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670376212_996064.png",
//         "rank": 76
//     },
//     {
//         "name": "Safari Wilds",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "safari-wilds",
//         "providerCode": "1594259",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670398289_781101.png",
//         "rank": 77
//     },
//     {
//         "name": "Cruise Royale",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "cruise-royale",
//         "providerCode": "1473388",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670422578_347167.png",
//         "rank": 78
//     },
//     {
//         "name": "Dreams of Macau",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "dreams-of-macau",
//         "providerCode": "79",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677313330_673757.png",
//         "rank": 79
//     },
//     {
//         "name": "Circus Delight",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "circus-delight",
//         "providerCode": "80",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674029043_361325.png",
//         "rank": 80
//     },
//     {
//         "name": "Fruity Candy",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fruity-candy",
//         "providerCode": "1397455",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670680941_920474.png",
//         "rank": 81
//     },
//     {
//         "name": "Phoenix Rises",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "phoenix-rises",
//         "providerCode": "82",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734681123302_539861.png",
//         "rank": 82
//     },
//     {
//         "name": "Wild Fireworks",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "wild-fireworks",
//         "providerCode": "83",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675280582_257284.png",
//         "rank": 83
//     },
//     {
//         "name": "Queen of Bounty",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "queen-bounty",
//         "providerCode": "84",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680850627_140245.png",
//         "rank": 84
//     },
//     {
//         "name": "Genie's 3 Wishes",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "genies-wishes",
//         "providerCode": "85",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686792156_7383.png",
//         "rank": 85
//     },
//     {
//         "name": "Galactic Gems",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "galactic-gems",
//         "providerCode": "86",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686581875_81341.png",
//         "rank": 86
//     },
//     {
//         "name": "Treasures of Aztec",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "treasures-aztec",
//         "providerCode": "87",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670112779_209650.png",
//         "rank": 87
//     },
//     {
//         "name": "Jewels of Prosperity",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "jewels-prosper",
//         "providerCode": "88",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687472140_830639.png",
//         "rank": 88
//     },
//     {
//         "name": "Lucky Neko",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "lucky-neko",
//         "providerCode": "89",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687097681_155582.png",
//         "rank": 89
//     },
//     {
//         "name": "Secret of Cleopatra",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "sct-cleopatra",
//         "providerCode": "90",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680473133_698413.png",
//         "rank": 90
//     },
//     {
//         "name": "Guardians of Ice and Fire",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "gdn-ice-fire",
//         "providerCode": "91",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686813840_763808.png",
//         "rank": 91
//     },
//     {
//         "name": "Thai River Wonders",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "thai-river",
//         "providerCode": "92",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675915392_218496.png",
//         "rank": 92
//     },
//     {
//         "name": "Opera Dynasty",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "opera-dynasty",
//         "providerCode": "93",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686081848_609220.png",
//         "rank": 93
//     },
//     {
//         "name": "Bali Vacation",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "bali-vacation",
//         "providerCode": "94",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671820725_858126.png",
//         "rank": 94
//     },
//     {
//         "name": "Majestic Treasures",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "majestic-ts",
//         "providerCode": "95",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686806992_295998.png",
//         "rank": 95
//     },
//     {
//         "name": "Lucky Clover Riches",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "lucky-clover",
//         "providerCode": "1601012",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670705406_640626.png",
//         "rank": 96,
//         "locale": {
//             "en": "Lucky Clover Lady",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Jack Frost's Winter",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "jack-frosts",
//         "providerCode": "97",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687164686_782116.png",
//         "rank": 97
//     },
//     {
//         "name": "Fortune Ox",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fortune-ox",
//         "providerCode": "98",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677523063_646297.png",
//         "rank": 98
//     },
//     {
//         "name": "Candy Bonanza",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "candy-bonanza",
//         "providerCode": "100",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671933824_69118.png",
//         "rank": 100
//     },
//     {
//         "name": "Rise of Apollo",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "rise-of-apollo",
//         "providerCode": "101",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680647411_395978.png",
//         "rank": 101
//     },
//     {
//         "name": "Mermaid Riches",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "mermaid-riches",
//         "providerCode": "102",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686570531_822090.png",
//         "rank": 102
//     },
//     {
//         "name": "Crypto Gold",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "crypto-gold",
//         "providerCode": "103",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674116457_602614.png",
//         "rank": 103
//     },
//     {
//         "name": "Wild Bandito",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "wild-bandito",
//         "providerCode": "104",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675500724_886834.png",
//         "rank": 104
//     },
//     {
//         "name": "Heist Stakes",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "heist-stakes",
//         "providerCode": "105",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687111745_70446.png",
//         "rank": 105
//     },
//     {
//         "name": "Ways of the Qilin",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "ways-of-qilin",
//         "providerCode": "106",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675561080_574693.png",
//         "rank": 106
//     },
//     {
//         "name": "Legendary Monkey King",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "lgd-monkey-kg",
//         "providerCode": "107",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687251739_763587.png",
//         "rank": 107
//     },
//     {
//         "name": "Buffalo Win",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "buffalo-win",
//         "providerCode": "108",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671880419_31943.png",
//         "rank": 108
//     },
//     {
//         "name": "Jurassic Kingdom",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "jurassic-kdm",
//         "providerCode": "110",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687543300_714748.png",
//         "rank": 110
//     },
//     {
//         "name": "Oriental Prosperity",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "oriental-pros",
//         "providerCode": "112",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734681202723_713705.png",
//         "rank": 112
//     },
//     {
//         "name": "Raider Jane's Crypt of Fortune",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "crypt-fortune",
//         "providerCode": "113",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680785252_86419.png",
//         "rank": 113
//     },
//     {
//         "name": "Emoji Riches",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "emoji-riches",
//         "providerCode": "114",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734677353335_534298.png",
//         "rank": 114
//     },
//     {
//         "name": "Supermarket Spree",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "sprmkt-spree",
//         "providerCode": "115",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734670749460_327578.png",
//         "rank": 115
//     },
//     {
//         "name": "Cocktail Nights",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "cocktail-nite",
//         "providerCode": "117",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734673999181_515399.png",
//         "rank": 117
//     },
//     {
//         "name": "Mask Carnival",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "mask-carnival",
//         "providerCode": "118",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686735020_428806.png",
//         "rank": 118
//     },
//     {
//         "name": "Ninja Raccoon Frenzy",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "ninja-raccoon",
//         "providerCode": "1529867",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686298264_313184.png",
//         "rank": 119
//     },
//     {
//         "name": "Spirited Wonders",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "spirit-wonder",
//         "providerCode": "119",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734676054333_108759.png",
//         "rank": 119
//     },
//     {
//         "name": "The Queen’s Banquet",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "queen-banquet",
//         "providerCode": "120",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675786175_390115.png",
//         "rank": 120
//     },
//     {
//         "name": "Destiny of Sun & Moon",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "dest-sun-moon",
//         "providerCode": "121",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734676845616_568330.png",
//         "rank": 121
//     },
//     {
//         "name": "Wild Heist Cashout",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "wild-heist-co",
//         "providerCode": "1568554",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1698730611456_546857.png",
//         "rank": 121
//     },
//     {
//         "name": "Garuda Gems",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "garuda-gems",
//         "providerCode": "122",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686686946_188625.png",
//         "rank": 122
//     },
//     {
//         "name": "Rooster Rumble",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "rooster-rbl",
//         "providerCode": "123",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734680590508_465203.png",
//         "rank": 123
//     },
//     {
//         "name": "Battleground Royale",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "battleground",
//         "providerCode": "124",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671839181_575183.png",
//         "rank": 124
//     },
//     {
//         "name": "Butterfly Blossom",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "btrfly-blossom",
//         "providerCode": "125",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734671896771_610835.png",
//         "rank": 125
//     },
//     {
//         "name": "Fortune Tiger",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fortune-tiger",
//         "providerCode": "126",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734686557792_527552.png",
//         "rank": 126
//     },
//     {
//         "name": "Speed Winner",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "speed-winner",
//         "providerCode": "127",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734676345020_354905.png",
//         "rank": 127
//     },
//     {
//         "name": "Legend of Perseus",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "legend-perseus",
//         "providerCode": "128",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687321846_755522.png",
//         "rank": 128
//     },
//     {
//         "name": "Win Win Fish Prawn Crab",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "win-win-fpc",
//         "providerCode": "129",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734675205093_397896.png",
//         "rank": 129
//     },
//     {
//         "name": "Lucky Piggy",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "lucky-piggy",
//         "providerCode": "130",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734687043451_100532.png",
//         "rank": 130
//     },
//     {
//         "name": "Pinata Wins",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "pinata-wins",
//         "providerCode": "1492288",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1712894961105_422172.png",
//         "rank": 131
//     },
//     {
//         "name": "Wild Coaster",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "wild-coaster",
//         "providerCode": "132",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737437192746_747119.png",
//         "rank": 132,
//         "locale": {
//             "en": "Wild Coaster",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Mystic Potion",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "mystic-potions",
//         "providerCode": "1717688",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734674860844_34478.png",
//         "rank": 133
//     },
//     {
//         "name": "Zombie Outbreak",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "zombie-outbrk",
//         "providerCode": "1635221",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737437023042_504091.png",
//         "rank": 134,
//         "locale": {
//             "en": "Zombie Outbreak",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Wild Bounty Showdown",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "wild-bounty-sd",
//         "providerCode": "135",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737436949630_49063.png",
//         "rank": 135,
//         "locale": {
//             "en": "Wild Bounty Showdown",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Futebol Fever",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "futebol-fever",
//         "providerCode": "1778752",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737436853066_173382.png",
//         "rank": 136,
//         "locale": {
//             "en": "Futebol Fever",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Shark Bounty",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "shark-hunter",
//         "providerCode": "1648578",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737436783117_64018.png",
//         "rank": 137,
//         "locale": {
//             "en": "Shark Bounty",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Yakuza Honor",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "yakuza-honor",
//         "providerCode": "1760238",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737436113940_638728.png",
//         "rank": 138,
//         "locale": {
//             "en": "Yakuza Honor",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Wings of Iguazu",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "wings-iguazu",
//         "providerCode": "1747549",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737436583602_159431.png",
//         "rank": 139,
//         "locale": {
//             "en": "Wings of Iguazu",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Three Crazy Piggies",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "three-cz-pigs",
//         "providerCode": "1727711",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737436447904_845397.png",
//         "rank": 140,
//         "locale": {
//             "en": "Three Crazy Piggies",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Oishi Delights",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "oishi-delights",
//         "providerCode": "1815268",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1737436256455_915132.png",
//         "rank": 141,
//         "locale": {
//             "en": "Oishi Delights",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Museum Mystery",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "museum-mystery",
//         "providerCode": "1755623",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734507584504_694036.png",
//         "rank": 142
//     },
//     {
//         "name": "Rio Fantasia",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "rio-fantasia",
//         "providerCode": "1786529",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734507609458_353633.png",
//         "rank": 143
//     },
//     {
//         "name": "Chocolate Deluxe",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "choc-deluxe",
//         "providerCode": "1666445",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734507644025_113646.png",
//         "rank": 144
//     },
//     {
//         "name": "Geisha's Revenge",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "geisha-revenge",
//         "providerCode": "1702123",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1734507698515_552525.png",
//         "rank": 145
//     },
//     {
//         "name": "Fortune Snake",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "fortune-snake",
//         "providerCode": "1879752",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1736351415011_694276.png",
//         "rank": 146,
//         "locale": {
//             "en": "Fortune Snake",
//             "th": "",
//             "cn": ""
//         }
//     },
//     {
//         "name": "Incan Wonders",
//         "category": "EGAMES",
//         "type": "SLOT",
//         "code": "incan-wonders",
//         "providerCode": "1850016",
//         "img": "https://superapi-products.s3-ap-southeast-1.amazonaws.com/PGSOFT/1739892351708_68955.png",
//         "rank": 147,
//         "locale": {
//             "en": "Incan Wonders",
//             "th": "สิ่งมหัศจรรย์ของชาวอินคา",
//             "cn": "印加奇迹"
//         }
//     }
// ]
const page = () => {
    const [game, setGame] = useState<any[]>([]);

    useEffect(() => {
        // productList();
        fetchdata();

    }, [])
    async function productList() {
        const request_time = Math.floor(Date.now() / 1000);
        const hash = md5(request_time + "YjdtewvMyPH4pWXuiZmXF3productlistH801");
        try {
            const result = await axios.get("https://staging.gsimw.com" + "/api/operators/available-products" +
                "?operator_code=H801" +
                "&sign=" + hash +
                "&request_time=" + request_time)
            console.log(result)

        } catch (err) {
            return err
        }
    }
    // const test () => {
    //     try {
    //         const request_time = Math.floor(Date.now() / 1000);
    //         //const request_time = new Date().getTime();
    //         const hash = md5(`${request_time}${process.env.SECRET_KEY}launchgame${process.env.OP_CODE}`);
    //         const raw = {
    //             "operator_code": process.env.OP_CODE,
    //             "member_account": user.Username,
    //             "password": user.Password,
    //             "currency": "THB",
    //             "game_code": game_code,
    //             "product_code": product_code,
    //             "game_type": game_type,
    //             "language_code": 3,
    //             "ip": ip,
    //             "platform": "web",
    //             "sign": hash,
    //             "request_time": request_time,
    //             "operator_lobby_url": "https://infinity999.com",
    //         }
    //         const callgame = await axios.post(`${process.env.API_NAME}/api/operators/launch-game`,
    //             JSON.stringify(raw),
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //             }
    //         )
    //         console.log(callgame);
    //         // return callgame.data;
    //     } catch (error) {
    //         console.log(error);
    //         return { status: 'no', message: "game error" }
    //     }
    // }
    const member = async () => {
        try {
            const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');

            axios.get(`https://test.ambsuperapi.com/betLimitsV2?productId=PGSOTF2&username=sou0001&currency=THB`,
                {
                    headers: {
                        'Authorization': `Basic ${basicAuth}`,
                        'Content-Type': 'application/json',
                    },
                }).then((result) => {
                    console.log(result)
                    // setGame(result)
                })
            //res.status(200).json(result.data);
        } catch (error) {
            //console.log(error)
            //res.status(200).json(error);
        }
        // try {
        //     const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');

        //     const result = await axios.get(`https://test.ambsuperapi.com/seamless/games?productId=PGSOFT2`,
        //         {
        //             headers: {
        //                 'Authorization': `Basic ${basicAuth}`,
        //                 'Content-Type': 'application/json',
        //             },
        //         })
        //     console.log(result.data)
        //     //res.status(200).json(result.data);
        // } catch (error) {
        //     console.log(error)
        //     //res.status(200).json(error);

        // }
    }
    const fetchdata = async () => {
        try {
            const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');

            axios.get(`https://test.ambsuperapi.com/seamless/games?productId=PGSOFT2`,
                {
                    headers: {
                        'Authorization': `Basic ${basicAuth}`,
                        'Content-Type': 'application/json',
                    },
                }).then((result) => {
                    console.log(result.data)
                    setGame(result.data.data.games)
                })
            //res.status(200).json(result.data);
        } catch (error) {
            //console.log(error)
            //res.status(200).json(error);
        }
        // try {
        //     const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');

        //     const result = await axios.get(`https://test.ambsuperapi.com/seamless/games?productId=PGSOFT2`,
        //         {
        //             headers: {
        //                 'Authorization': `Basic ${basicAuth}`,
        //                 'Content-Type': 'application/json',
        //             },
        //         })
        //     console.log(result.data)
        //     //res.status(200).json(result.data);
        // } catch (error) {
        //     console.log(error)
        //     //res.status(200).json(error);

        // }
    }
    const handlePay = (game: any) => {
        try {
            const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');
            axios.post(`https://test.ambsuperapi.com/seamless/logIn`,
                {
                    "username": "aisue0001",
                    "productId": "PGSOFT2",
                    "gameCode": game.code,
                    "isMobileLogin": false,
                    "sessionToken": basicAuth,
                    "language": "th",
                    "callbackUrl": "infinity999.com",
                    // "sessionToken": "d4be40d1-349f-4fc2-a955-35d2a4bff254",
                },
                {
                    headers: {
                        'Authorization': `Basic ${basicAuth}`,
                        'Content-Type': 'application/json',
                    },
                }).then((result) => {
                    console.log(result.data)
                    // window.open(result.data.data.url, "_bank")
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full p-5 grid grid-cols-6'>
            {game && game.map((item, index) => {
                return (
                    <div key={index} onClick={() => handlePay(item)} className=' border'>
                        {item.name}
                        <img alt='' src={item.img} />
                        {item.providerCode}
                    </div>
                )
            })}
        </div>
    )
}

export default page