

var water = ['Water', 0, 0, 2, 30, 3, 4, "DROUGHT",	"LOTSOFWATER", "DESERT", 30, 50];
var furs = ['Furs', 0, 0, 0, 250, 10, 10, "COLD",	"RICHFAUNA", "LIFELESS", 230, 280];
var food = ['Food', 1, 0, 1, 100, 5, 5, "CROPFAIL", "RICHSOIL", "POORSOIL", 90, 160];
var ore = ['Ore', 2, 2, 3, 350, 20, 10, "WAR", "MINERALRICH", "MINERALPOOR", 350, 420];
var games = ['Games', 3, 1, 6, 250, -10, 5, "BOREDOM", "ARTISTIC", "never", 160, 270];
var firearms = ['Firearms', 3, 1, 5, 1250, -75, 100, "WAR", "WARLIKE", "never", 600, 1100];
var medicine = ['Medicine', 4, 1, 6, 650, -20, 10, "PLAGUE", "LOTSOFHERBS", "never", 400, 700];
var machines = ['Machines', 4, 3, 5, 900, -30, 5, "LACKOFWORKERS",	"never", "never", 600, 800];
var narcotics = ['Narcotics', 5, 0, 5, 3500, -125, 150, "BOREDOME",	"WEIRDMUSHROOMS", "never", 2000, 3000];
var robots = ['Robots', 6, 4, 7, 5000, -150, 100, "LACKOFWORKERS", "never", "never", 3500, 5000];

/**
 * Format of this Dictionary
 * 0 Name
 * 1 minTechProduce
 * 2 minTechUse
 * 3 techLvlMostProduction
 * 4 basePrice
 * 5 priceIncrease
 * 6 variability
 * 7 increaseEvent
 * 8 conditionReduce
 * 9 conditionExpensive
 * 10 minPriceOffPlanet
 * 11 maxPriceOffplanet
 */

export var items = {
    Water: water,
    Furs: furs,
    Food: food,
    Ore: ore,
    Games: games,
    Firearms: firearms,
    Medicine: medicine,
    Machines: machines,
    Narcotics: narcotics,
    Robots: robots,
};


