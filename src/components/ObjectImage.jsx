import React, { useState } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";

// redux
import { connect } from "react-redux";
import {
  updateXYPosition,
  toggleObjectSelected,
  deselectAllObjects,
  updateRotation,
  removeObjectFromDiagram,
  toggleObjectLocked
} from "./../actions";

// all these requires have to be done here to work with webpack
// a better solution would be to host these somewhere else, but....

const PlusGrnRoll = require("./../assets/+Grn Roll.png");
const MinusGrnRoll = require("./../assets/-Grn Roll.png");
const OneMarkerBlack = require("./../assets/1 Marker Black.png");
const OneLabel = require("./../assets/1 Label.png");
const OneMarkerBlue = require("./../assets/1 Marker Blue.png");
const OneMarkerGreen = require("./../assets/1 Marker Green.png");
const OneMarkerRed = require("./../assets/1 Marker Red.png");
const OneMarkerYellow = require("./../assets/1 Marker Yellow.png");
const TenFootCurvedRadius = require("./../assets/10_ Curved Radius.png");
const TenByTenCornerRoom = require("./../assets/10_ x 10_ Corner Room.png");
const TenByTenOpenRoom = require("./../assets/10_ x 10_ Open Room.png");
const TenByTenRoom = require("./../assets/10_ x 10_ Room.png");
const TenByTenCanopy = require("./../assets/10x10 Canopy.png");
const TwelveByTwelveFlagAngled = require("./../assets/12x12 Flag Angled.png");
const TwelveByTwelveFlagFreeHanging = require("./../assets/12x12 Flag Free Hanging.png");
const TwelveByTwelveFlagwithFrame = require("./../assets/12x12 Flag with Frame.png");
const TwelveByTwelveGridClothAngled = require("./../assets/12x12 Grid Cloth Angled.png");
const TwelveByTwelveGridClothFreeHanging = require("./../assets/12x12 Grid Cloth Free Hanging.png");
const TwelveByTwelveGridClothwithFrame = require("./../assets/12x12 Grid Cloth with Frame.png");
const TwelveByTwelveUltraBounceAngled = require("./../assets/12x12 Ultra Bounce Angled.png");
const TwelveByTwelveUltraBounceFreeHanging = require("./../assets/12x12 Ultra Bounce Free Hanging.png");
const TwelveByTwelveUltraBouncewithFrame = require("./../assets/12x12 Ultra Bounce with Frame.png");
const TwelveByTwelveUnbleachedMuslinAngled = require("./../assets/12x12 Unbleached Muslin Angled.png");
const TwelveByTwelveUnbleachedMuslinFreeHanging = require("./../assets/12x12 Unbleached Muslin Free Hanging.png");
const TwelveByTwentyFlagAngled = require("./../assets/12x20 Flag Angled.png");
const TwelveByTwelveUnbleachedMuslinwithFrame = require("./../assets/12x12 Unbleached Muslin with Frame.png");
const TwelveByTwentyFlagwithFrame = require("./../assets/12x20 Flag with Frame.png");
const TwelveByTwentyGridClothAngled = require("./../assets/12x20 Grid Cloth Angled.png");
const TwelveByTwentyGridClothwithFrame = require("./../assets/12x20 Grid Cloth with Frame.png");
const TwelveByTwentyUltraBounceAngled = require("./../assets/12x20 Ultra Bounce Angled.png");
const TwelveByTwentyUltraBouncewithFrame = require("./../assets/12x20 Ultra Bounce with Frame.png");
const TwelveByTwentyUnbleachedMuslinAngled = require("./../assets/12x20 Unbleached Muslin Angled.png");
const TwelveByTwentyUnbleachedMuslinwithFrame = require("./../assets/12x20 Unbleached Muslin with Frame.png");
const EighteenByTwentyFourArtificialSilkAngled = require("./../assets/18x24 Artificial Silk Angled.png");
const EighteenByTwentyFourArtificialSilk = require("./../assets/18x24 Artificial Silk.png");
const EighteenByTwentyFourDoubleBlackScrimAngled = require("./../assets/18x24 Double Black Scrim Angled.png");
const EighteenByTwentyFourSingleBlackScrimAngled = require("./../assets/18x24 Single Black Scrim Angled.png");
const EighteenByTwentyFourDoubleBlackScrim = require("./../assets/18x24 Double Black Scrim.png");
const EighteenByTwentyFourSingleBlackScrim = require("./../assets/18x24 Single Black Scrim.png");
const EighteenByTwentyFourSolidAngled = require("./../assets/18x24 Solid Angled.png");
const EighteenByTwentyFourSolid = require("./../assets/18x24 Solid.png");
const EighteenByTwentyFourWhiteSilkAngled = require("./../assets/18x24 White Silk Angled.png");
const EighteenByTwentyFourWhiteSilk = require("./../assets/18x24 White Silk.png");
const OneByOneLitemat = require("./../assets/1x1 Litemat.png");
const TwoLabel = require("./../assets/2 Label.png");
const TwoMarkerBlack = require("./../assets/2 Marker Black.png");
const TwoMarkerBlue = require("./../assets/2 Marker Blue.png");
const TwoMarkerGreen = require("./../assets/2 Marker Green.png");
const TwoMarkerRed = require("./../assets/2 Marker Red.png");
const TwoMarkerYellow = require("./../assets/2 Marker Yellow.png");
const TwentyFootCurvedRadius = require("./../assets/20_ Curved Radius.png");
const TwentyByTwentyCornerRoom = require("./../assets/20_ x 20_ Corner Room.png");
const TwentyByTwentyOpenRoom = require("./../assets/20_ x 20_ Open Room.png");
const TwentyByTwentyRoom = require("./../assets/20_ x 20_ Room.png");
const TwentyByFortyOpenRoom = require("./../assets/20_ x 40_ Open Room.png");
const TwentyByFortyRoom = require("./../assets/20_ x 40_ Room.png");
const TwentyByTwentyFlagAngled = require("./../assets/20x20 Flag Angled.png");
const TwentyByTwentyFlagFreeHanging = require("./../assets/20x20 Flag Free Hanging.png");
const TwentyByTwentyGridClothAngled = require("./../assets/20x20 Grid Cloth Angled.png");
const TwentyByTwentyFlagwithFrame = require("./../assets/20x20 Flag with Frame.png");
const TwentyByTwentyGridClothFreeHanging = require("./../assets/20x20 Grid Cloth Free Hanging.png");
const TwentyByTwentyGridClothwithFrame = require("./../assets/20x20 Grid Cloth with Frame.png");
const TwentyByTwentyUltraBounceAngled = require("./../assets/20x20 Ultra Bounce Angled.png");
const TwentyByTwentyUltraBounceFreeHanging = require("./../assets/20x20 Ultra Bounce Free Hanging.png");
const TwentyByTwentyUltraBouncewithFrame = require("./../assets/20x20 Ultra Bounce with Frame.png");
const TwentyByTwentyUnbleachedMuslinAngled = require("./../assets/20x20 Unbleached Muslin Angled.png");
const TwentyByTwentyUnbleachedMuslinwithFrame = require("./../assets/20x20 Unbleached Muslin with Frame.png");
const TwentyByTwentyUnbleachedMuslinFreeHanging = require("./../assets/20x20 Unbleached Muslin Free Hanging.png");
const TwoKLED = require("./../assets/2K LED.png");
const TwoByTwoLitemat = require("./../assets/2x2 Litemat.png");
const TwoByThreeArtificialSilkAngled = require("./../assets/2x3 Artificial Silk Angled.png");
const TwoByThreeArtificialSilk = require("./../assets/2x3 Artificial Silk.png");
const TwoByThreeDoubleBlackScrimAngled = require("./../assets/2x3 Double Black Scrim Angled.png");
const TwoByThreeDoubleBlackScrim = require("./../assets/2x3 Double Black Scrim.png");
const TwoByThreeSingleBlackScrimAngled = require("./../assets/2x3 Single Black Scrim Angled.png");
const TwoByThreeSingleBlackScrim = require("./../assets/2x3 Single Black Scrim.png");
const TwoByThreeSolidAngled = require("./../assets/2x3 Solid Angled.png");
const TwoByThreeSolid = require("./../assets/2x3 Solid.png");
const TwoByThreeWhiteSilkAngled = require("./../assets/2x3 White Silk Angled.png");
const TwoByThreeWhiteSilk = require("./../assets/2x3 White Silk.png");
const ThreeLabel = require("./../assets/3 Label.png");
const ThreeMarkerBlack = require("./../assets/3 Marker Black.png");
const ThreeMarkerBlue = require("./../assets/3 Marker Blue.png");
const ThreeMarkerGreen = require("./../assets/3 Marker Green.png");
const ThreeMarkerRed = require("./../assets/3 Marker Red.png");
const ThreeMarkerYellow = require("./../assets/3 Marker Yellow.png");
const ThreeftSlider = require("./../assets/3ft Slider.png");
const FourLabel = require("./../assets/4 Label.png");
const FourMarkerBlack = require("./../assets/4 Marker Black.png");
const FourMarkerBlue = require("./../assets/4 Marker Blue.png");
const FourMarkerGreen = require("./../assets/4 Marker Green.png");
const FourMarkerRed = require("./../assets/4 Marker Red.png");
const FourMarkerYellow = require("./../assets/4 Marker Yellow.png");
const FourftTrackSection = require("./../assets/4ft Track Section.png");
const FourByOneLitemat = require("./../assets/4x1 Litemat.png");
const FourByTwoLitemat = require("./../assets/4x2 Litemat.png");
const FourByFourArtificialSilkAngled = require("./../assets/4x4 Artificial Silk Angled.png");
const FourByFourArtificialSilk = require("./../assets/4x4 Artificial Silk.png");
const FourByFourDoubleBlackScrimAngled = require("./../assets/4x4 Double Black Scrim Angled.png");
const FourByFourDoubleBlackScrim = require("./../assets/4x4 Double Black Scrim.png");
const FourByFourFoamCoreAngled = require("./../assets/4x4 Foam Core Angled.png");
const FourByFourFoamCore = require("./../assets/4x4 Foam Core.png");
const FourByFourShinyBoardDottedAngled = require("./../assets/4x4 Shiny Board Dotted Angled.png");
const FourByFourShinyBoardDotted = require("./../assets/4x4 Shiny Board Dotted.png");
const FourByFourShinyBoardSmoothAngled = require("./../assets/4x4 Shiny Board Smooth Angled.png");
const FourByFourShinyBoardSmooth = require("./../assets/4x4 Shiny Board Smooth.png");
const FourByFourSingleBlackScrimAngled = require("./../assets/4x4 Single Black Scrim Angled.png");
const FourByFourSingleBlackScrim = require("./../assets/4x4 Single Black Scrim.png");
const FourByFourSolidAngled = require("./../assets/4x4 Solid Angled.png");
const FourByFourSolid = require("./../assets/4x4 Solid.png");
const FourByFourWhiteSilkAngled = require("./../assets/4x4 White Silk Angled.png");
const FourByFourWhiteSilk = require("./../assets/4x4 White Silk.png");
const FourByEightFoamCoreAngled = require("./../assets/4x8 Foam Core Angled.png");
const FourByEightFoamCore = require("./../assets/4x8 Foam Core.png");
const FiveLabel = require("./../assets/5 Label.png");
const FiveMarkerBlack = require("./../assets/5 Marker Black.png");
const FiveMarkerBlue = require("./../assets/5 Marker Blue.png");
const FiveMarkerGreen = require("./../assets/5 Marker Green.png");
const FiveMarkerRed = require("./../assets/5 Marker Red.png");
const FiveMarkerYellow = require("./../assets/5 Marker Yellow.png");
const SixftSlider = require("./../assets/6ft Slider.png");
const SixBySixFlagAngled = require("./../assets/6x6 Flag Angled.png");
const SixBySixFlagFreeHanging = require("./../assets/6x6 Flag Free Hanging.png");
const SixBySixFlagwithFrame = require("./../assets/6x6 Flag with Frame.png");
const SixBySixGridClothAngled = require("./../assets/6x6 Grid Cloth Angled.png");
const SixBySixGridClothFreeHanging = require("./../assets/6x6 Grid Cloth Free Hanging.png");
const SixBySixGridClothwithFrame = require("./../assets/6x6 Grid Cloth with Frame.png");
const SixBySixUltraBounceAngled = require("./../assets/6x6 Ultra Bounce Angled.png");
const SixBySixUltraBounceFreeHanging = require("./../assets/6x6 Ultra Bounce Free Hanging.png");
const SixBySixUltraBouncewithFrame = require("./../assets/6x6 Ultra Bounce with Frame.png");
const SixBySixUnbleachedMuslinAngled = require("./../assets/6x6 Unbleached Muslin Angled.png");
const SixBySixUnbleachedMuslinFreeHanging = require("./../assets/6x6 Unbleached Muslin Free Hanging.png");
const SixBySixUnbleachedMuslinwithFrame = require("./../assets/6x6 Unbleached Muslin with Frame.png");
const EightFootBoxTruss = require("./../assets/8_ Box Truss.png");
const EightFootTrackSection = require("./../assets/8ft Track Section.png");
const EightByEightFlagAngled = require("./../assets/8x8 Flag Angled.png");
const EightByEightFlagFreeHanging = require("./../assets/8x8 Flag Free Hanging.png");
const EightByEightFlagwithFrame = require("./../assets/8x8 Flag with Frame.png");
const EightByEightGridClothAngled = require("./../assets/8x8 Grid Cloth Angled.png");
const EightByEightGridClothFreeHanging = require("./../assets/8x8 Grid Cloth Free Hanging.png");
const EightByEightGridClothwithFrame = require("./../assets/8x8 Grid Cloth with Frame.png");
const EightByEightUltraBounceAngled = require("./../assets/8x8 Ultra Bounce Angled.png");
const EightByEightUltraBounceFreeHanging = require("./../assets/8x8 Ultra Bounce Free Hanging.png");
const EightByEightUltraBouncewithFrame = require("./../assets/8x8 Ultra Bounce with Frame.png");
const EightByEightUnbleachedMuslinAngled = require("./../assets/8x8 Unbleached Muslin Angled.png");
const EightByEightUnbleachedMuslinFreeHanging = require("./../assets/8x8 Unbleached Muslin Free Hanging.png");
const EightByEightUnbleachedMuslinwithFrame = require("./../assets/8x8 Unbleached Muslin with Frame.png");
const ALabel = require("./../assets/A Label.png");
const AputureOneTwo0D = require("./../assets/Aputure 120D.png");
const AputureThree00D = require("./../assets/Aputure 300D.png");
const AputureLSOneTwowTop = require("./../assets/Aputure LS 1-2w Top.png");
const AputureLSOneTwow = require("./../assets/Aputure LS 1-2w.png");
const AputureLSminiTwo0 = require("./../assets/Aputure LS-mini20.png");
const AputureLightDomeMini = require("./../assets/Aputure Light Dome Mini.png");
const AputureLightDome = require("./../assets/Aputure Light Dome.png");
const ArriOneFive0 = require("./../assets/Arri 150.png");
const ArriTwoKPlusArrilite = require("./../assets/Arri 2K Plus Arrilite.png");
const ArriThree00 = require("./../assets/Arri 300.png");
const ArriSixFive0 = require("./../assets/Arri 650.png");
const ArriSevenFive0PlusArrilite = require("./../assets/Arri 750 Plus Arrilite.png");
const ArriAlexaMini = require("./../assets/Arri Alexa Mini.png");
const ArriAlexaSXT = require("./../assets/Arri Alexa SXT.png");
const ArriAmira = require("./../assets/Arri Amira.png");
const ArriFresnelOne8OneTwo = require("./../assets/Arri Fresnel 18-12.png");
const ArriLOne0 = require("./../assets/Arri L10.png");
const ArriLFive = require("./../assets/Arri L5.png");
const ArriLSeven = require("./../assets/Arri L7.png");
const ArriMOne8 = require("./../assets/Arri M18.png");
const ArriMFour0 = require("./../assets/Arri M40.png");
const ArriM8 = require("./../assets/Arri M8.png");
const ArriMEight0 = require("./../assets/Arri M90.png");
const ArriSOneTwo0cTop = require("./../assets/Arri S120c Top.png");
const ArriSOneTwo0c = require("./../assets/Arri S120c.png");
const ArriSThree0cTop = require("./../assets/Arri S30c Top.png");
const ArriSThree0c = require("./../assets/Arri S30c.png");
const ArriSThreeSix0cTop = require("./../assets/Arri S360c Top.png");
const ArriSThreeSix0c = require("./../assets/Arri S360c.png");
const ArriSSix0cTop = require("./../assets/Arri S60c Top.png");
const ArriSSix0c = require("./../assets/Arri S60c.png");
const ArrimaxOne8OneTwo = require("./../assets/Arrimax 18-12.png");
const ArrowBlack = require("./../assets/Arrow Black.png");
const ArrowGreen = require("./../assets/Arrow Green.png");
const ArrowBlue = require("./../assets/Arrow Blue.png");
const ArrowRed = require("./../assets/Arrow Red.png");
const ArrowYellow = require("./../assets/Arrow Yellow.png");
const AsteraAXOnePixelTube = require("./../assets/Astera AX1 Pixel Tube.png");
const AstraOneByOneTop = require("./../assets/Astra 1x1 Top.png");
const AstraOneByOne = require("./../assets/Astra 1x1.png");
const BLabel = require("./../assets/B Label.png");
const BareBulb = require("./../assets/Bare Bulb.png");
const BedOnePersonLeftBack = require("./../assets/Bed One Person Left Back.png");
const BedOnePersonLeftSide = require("./../assets/Bed One Person Left Side.png");
const BedOnePersonRightBack = require("./../assets/Bed One Person Right Back.png");
const BedOnePersonRightSide = require("./../assets/Bed One Person Right Side.png");
const BedTwoPeopleBacks = require("./../assets/Bed Two People Backs.png");
const BounceShowcardBlank = require("./../assets/Bounce Showcard Blank.png");
const BounceShowcard = require("./../assets/Bounce Showcard.png");
const BoxTrussEight0DegreeCorner = require("./../assets/Box Truss 90 Degree Corner.png");
const BrieseFocusOne00 = require("./../assets/Briese Focus 100.png");
const BrieseFocusOne80 = require("./../assets/Briese Focus 180.png");
const BrieseFocusTwoTwo0 = require("./../assets/Briese Focus 220.png");
const BrieseFocusThreeThree0 = require("./../assets/Briese Focus 330.png");
const CLabel = require("./../assets/C Label.png");
const CTBRoll = require("./../assets/CTB Roll.png");
const CTORoll = require("./../assets/CTO Roll.png");
const CanonFiveD = require("./../assets/Canon 5D.png");
const CanonCOne00 = require("./../assets/Canon C100.png");
const ChapmanDolly = require("./../assets/Chapman Dolly.png");
const ChinaBall = require("./../assets/China Ball.png");
const CircleTrack = require("./../assets/Circle Track.png");
const Compass = require("./../assets/Compass.png");
const Condor = require("./../assets/Condor.png");
const CraftyTable = require("./../assets/Crafty Table.png");
const PlusCutGrn = require("./../assets/Cut +Grn.png");
const MinusCutGrn = require("./../assets/Cut -Grn.png");
const CutCTB = require("./../assets/Cut CTB.png");
const CutCTO = require("./../assets/Cut CTO.png");
const DLabel = require("./../assets/D Label.png");
const DITCart = require("./../assets/DIT Cart.png");
const DSOneSingle = require("./../assets/DS-1 Single.png");
const DSOne = require("./../assets/DS-1.png");
const DanyDollywithRails = require("./../assets/Dany Dolly with Rails.png");
const DaylightOneFiveDegrees = require("./../assets/Daylight 15 Degrees.png");
const DaylightTwo0Degrees = require("./../assets/Daylight 20 Degrees.png");
const DaylightThree0Degrees = require("./../assets/Daylight 30 Degrees.png");
const DaylightFiveDegrees = require("./../assets/Daylight 5 Degrees.png");
const DaylightFive0Degrees = require("./../assets/Daylight 50 Degrees.png");
const DaylightSeven0Degrees = require("./../assets/Daylight 70 Degrees.png");
const DaylightEight0Degrees = require("./../assets/Daylight 90 Degrees.png");
const DensityEighthLabel = require("./../assets/Density Eighth Label.png");
const DensityHalfLabel = require("./../assets/Density Half Label.png");
const DensityQuarterLabel = require("./../assets/Density Quarter Label.png");
const DigitalSputnikDSOneFront = require("./../assets/Digital Sputnik DS1 Front.png");
const DigitalSputnikDSSix = require("./../assets/Digital Sputnik DS6.png");
const DigitalSputnikVoyagerTwoft = require("./../assets/Digital Sputnik Voyager 2ft.png");
const DigitalSputnikVoyagerFourft = require("./../assets/Digital Sputnik Voyager 4ft.png");
const Distro = require("./../assets/Distro.png");
const DivaTwo00Back = require("./../assets/Diva 200 Back.png");
const DivaTwo00TopLong = require("./../assets/Diva 200 Top Long.png");
const DivaTwo00TopUpright = require("./../assets/Diva 200 Top Upright.png");
const DivaFour00Back = require("./../assets/Diva 400 Back.png");
const DivaFour00TopLong = require("./../assets/Diva 400 Top Long.png");
const DivaFour00TopUpright = require("./../assets/Diva 400 Top Upright.png");
const Door = require("./../assets/Door.png");
const DoorwayDollyStandardWheels = require("./../assets/Doorway Dolly Standard Wheels.png");
const DoorwayDollyTrackWheels = require("./../assets/Doorway Dolly Track Wheels.png");
const DoubleCouch = require("./../assets/Double Couch.png");
const DoubleOutdoorSpot = require("./../assets/Double Outdoor Spot.png");
const ELabel = require("./../assets/E Label.png");
const ETCSourceFourLEDEllipsoidal = require("./../assets/ETC Source Four LED Ellipsoidal.png");
const EdgeLabel = require("./../assets/Edge Label.png");
const Ellipsoidal = require("./../assets/Ellipsoidal.png");
const EyeLabel = require("./../assets/Eye Label.png");
const FLabel = require("./../assets/F Label.png");
const FillLabel = require("./../assets/Fill Label.png");
const FisherDolly = require("./../assets/Fisher Dolly.png");
const Flashlight = require("./../assets/Flashlight.png");
const FrostRoll = require("./../assets/Frost Roll.png");
const GLabel = require("./../assets/G Label.png");
const GafferFourByTwo_Back = require("./../assets/Gaffer 4x2_ Back.png");
const GafferFourByFour_Back = require("./../assets/Gaffer 4x4_ Back.png");
const GafferFourByFour_TopLong = require("./../assets/Gaffer 4x4_ Top Long.png");
const GafferFourByFour_TopUpright = require("./../assets/Gaffer 4x4_ Top Upright.png");
const Generator = require("./../assets/Generator.png");
const GenieLift = require("./../assets/Genie Lift.png");
const GrayOneTwoftPaper = require("./../assets/Gray 12ft Paper.png");
const GrayChair = require("./../assets/Gray Chair.png");
const GreenOneTwoftPaper = require("./../assets/Green 12ft Paper.png");
const GridRoll = require("./../assets/Grid Roll.png");
const HLabel = require("./../assets/H Label.png");
const Hazer = require("./../assets/Hazer.png");
const IndustrialFan = require("./../assets/Industrial Fan.png");
const JLabel = require("./../assets/J Label.png");
const JokerOneSix00Softube = require("./../assets/Joker 1600 Softube.png");
const JokerOneSix00 = require("./../assets/Joker 1600.png");
const JokerTwo00Softube = require("./../assets/Joker 200 Softube.png");
const JokerTwo00 = require("./../assets/Joker 200.png");
const JokerFour00Softube = require("./../assets/Joker 400 Softube.png");
const JokerFour00 = require("./../assets/Joker 400.png");
const Joker800Softube = require("./../assets/Joker 800 Softube.png");
const Joker800 = require("./../assets/Joker 800.png");
const KLabel = require("./../assets/K Label.png");
const KeyLabel = require("./../assets/Key Label.png");
const KickerLabel = require("./../assets/Kicker Label.png");
const KinoBareTwo_Daylight = require("./../assets/Kino Bare 2_ Daylight.png");
const KinoBareTwo_Tungsten = require("./../assets/Kino Bare 2_ Tungsten.png");
const KinoBareFour_Daylight = require("./../assets/Kino Bare 4_ Daylight.png");
const KinoBareFour_Tungsten = require("./../assets/Kino Bare 4_ Tungsten.png");
const KinoBareDaylightEnd = require("./../assets/Kino Bare Daylight End.png");
const KinoBareTungstenEnd = require("./../assets/Kino Bare Tungsten End.png");
const KinoCelebTwoFive0Top = require("./../assets/Kino Celeb 250 Top.png");
const KinoCelebTwoFive0 = require("./../assets/Kino Celeb 250.png");
const KinoCelebFourFive0Top = require("./../assets/Kino Celeb 450 Top.png");
const KinoCelebFourFive0 = require("./../assets/Kino Celeb 450.png");
const KinoCeleb8Five0Front = require("./../assets/Kino Celeb 850 Front.png");
const LadderTrusswithBrackets = require("./../assets/Ladder Truss with Brackets.png");
const LampwithShade = require("./../assets/Lamp with Shade.png");
const LargeCircularTable = require("./../assets/Large Circular Table.png");
const LargeDaylightGlobe = require("./../assets/Large Daylight Globe.png");
const LargeGreenCycWall = require("./../assets/Large Green Cyc Wall.png");
const LargePancake = require("./../assets/Large Pancake.png");
const LargeSoftbox = require("./../assets/Large Softbox.png");
const LargeSquareTable = require("./../assets/Large Square Table.png");
const LargeTreeTrunk = require("./../assets/Large Tree Trunk.png");
const LargeTungstenGlobe = require("./../assets/Large Tungsten Globe.png");
const LargeWhiteCycWall = require("./../assets/Large White Cyc Wall.png");
const LargeWindow = require("./../assets/Large Window.png");
const LightGridRoll = require("./../assets/Light Grid Roll.png");
const LightweightSticks = require("./../assets/Lightweight Sticks.png");
const LiteRibbonOneTwo_ = require("./../assets/LiteRibbon 12_.png");
const LiteRibbonTwoFour_ = require("./../assets/LiteRibbon 24_.png");
const LiteTileTwoxFour = require("./../assets/LiteTile 2x4.png");
const LiteTileTwox8 = require("./../assets/LiteTile 2x8.png");
const MLabel = require("./../assets/M Label.png");
const MaskOne = require("./../assets/Mask1.png");
const MaskTwo = require("./../assets/Mask2.png");
const MaskThree = require("./../assets/Mask3.png");
const MediumDaylightGlobe = require("./../assets/Medium Daylight Globe.png");
const MediumPancake = require("./../assets/Medium Pancake.png");
const MediumTungstenGlobe = require("./../assets/Medium Tungsten Globe.png");
const MicandBoom = require("./../assets/Mic and Boom.png");
const Mirror = require("./../assets/Mirror.png");
const MoleOneTwoKPar = require("./../assets/Mole 12K Par.png");
const MoleOneSix00wTenorLED = require("./../assets/Mole 1600w TenorLED.png");
const MoleOneKZipSoftlite = require("./../assets/Mole 1K Zip Softlite.png");
const MoleTwoKPar = require("./../assets/Mole 2K Par.png");
const MoleTwoKZipSoftlite = require("./../assets/Mole 2K Zip Softlite.png");
const MoleFiveKPar = require("./../assets/Mole 5K Par.png");
const MoleSixLightMolefay = require("./../assets/Mole 6 Light Molefay.png");
const MoleSixKMolepar = require("./../assets/Mole 6K Molepar.png");
const MoleEightLightMolefay = require("./../assets/Mole 9 Light Molefay.png");
const MoleEight00wSeniorLED = require("./../assets/Mole 900w SeniorLED.png");
const MoleEightKMolepar = require("./../assets/Mole 9K Molepar.png");
const MoleParSixFour = require("./../assets/Mole Par 64.png");
const NLabel = require("./../assets/N Label.png");
const NegShowcardBlank = require("./../assets/Neg Showcard Blank.png");
const NegShowcard = require("./../assets/Neg Showcard.png");
const OfficeChair = require("./../assets/Office Chair.png");
const PLabel = require("./../assets/P Label.png");
const ProductionMonitor = require("./../assets/Production Monitor.png");
const QuasarOneTwo_QLED = require("./../assets/Quasar 12_ Q-LED.png");
const QuasarOne_BiColor = require("./../assets/Quasar 1_ Bi-Color.png");
const QuasarOne_Daylight = require("./../assets/Quasar 1_ Daylight.png");
const QuasarOne_Tungsten = require("./../assets/Quasar 1_ Tungsten.png");
const QuasarTwoFour_QLED = require("./../assets/Quasar 24_ Q-LED.png");
const QuasarTwo_BiColor = require("./../assets/Quasar 2_ Bi-Color.png");
const QuasarTwo_Daylight = require("./../assets/Quasar 2_ Daylight.png");
const QuasarTwo_Tungsten = require("./../assets/Quasar 2_ Tungsten.png");
const QuasarFour_BiColor = require("./../assets/Quasar 4_ Bi-Color.png");
const QuasarFour_Daylight = require("./../assets/Quasar 4_ Daylight.png");
const QuasarFour_Tungsten = require("./../assets/Quasar 4_ Tungsten.png");
const QuasarSeven_QLED = require("./../assets/Quasar 7_ Q-LED.png");
const QuasarBiColorUpright = require("./../assets/Quasar Bi-Color Upright.png");
const QuasarDaylightUpright = require("./../assets/Quasar Daylight Upright.png");
const QuasarTungstenUpright = require("./../assets/Quasar Tungsten Upright.png");
const RLabel = require("./../assets/R Label.png");
const REDDragon = require("./../assets/RED Dragon.png");
const RedWeapon = require("./../assets/Red Weapon.png");
const RegularSticks = require("./../assets/Regular Sticks.png");
const SLabel = require("./../assets/S Label.png");
const SidewalkSection = require("./../assets/Sidewalk Section.png");
const SingleCouch = require("./../assets/Single Couch.png");
const SingleOutdoorSpot = require("./../assets/Single Outdoor Spot.png");
const SittingPerson = require("./../assets/Sitting Person.png");
const SmallCircularTable = require("./../assets/Small Circular Table.png");
const SmallGreenCycWall = require("./../assets/Small Green Cyc Wall.png");
const SmallLED = require("./../assets/Small LED.png");
const SmallPortableJib = require("./../assets/Small Portable Jib.png");
const SmallRectangleTable = require("./../assets/Small Rectangle Table.png");
const SmallSoftbox = require("./../assets/Small Softbox.png");
const SmallWhiteCycWall = require("./../assets/Small White Cyc Wall.png");
const SmallWindow = require("./../assets/Small Window.png");
const SmallestDaylightGlobe = require("./../assets/Smallest Daylight Globe.png");
const SmallestTungstenGlobe = require("./../assets/Smallest Tungsten Globe.png");
const Spacelight = require("./../assets/Spacelight.png");
const StandingPerson = require("./../assets/Standing Person.png");
const StreetLightMercuryVapor = require("./../assets/Street Light Mercury Vapor.png");
const StreetLightSodiumVapor = require("./../assets/Street Light Sodium Vapor.png");
const StreetLight = require("./../assets/Street Light.png");
const SunRise = require("./../assets/Sun Rise.png");
const SunSet = require("./../assets/Sun Set.png");
const TLabel = require("./../assets/T Label.png");
const TrafficCone = require("./../assets/Traffic Cone.png");
const Tree = require("./../assets/Tree.png");
const TriangleTrusswithBrackets = require("./../assets/Triangle Truss with Brackets.png");
const Triolet = require("./../assets/Triolet.png");
const TripleCouch = require("./../assets/Triple Couch.png");
const TungstenOneFiveDegrees = require("./../assets/Tungsten 15 Degrees.png");
const TungstenTwo0Degrees = require("./../assets/Tungsten 20 Degrees.png");
const TungstenThree0Degrees = require("./../assets/Tungsten 30 Degrees.png");
const TungstenFiveDegrees = require("./../assets/Tungsten 5 Degrees.png");
const TungstenFive0Degrees = require("./../assets/Tungsten 50 Degrees.png");
const TungstenSeven0Degrees = require("./../assets/Tungsten 70 Degrees.png");
const TungstenEight0Degrees = require("./../assets/Tungsten 90 Degrees.png");
const ULabel = require("./../assets/U Label.png");
const VLabel = require("./../assets/V Label.png");
const VeryLargeDaylightGlobe = require("./../assets/Very Large Daylight Globe.png");
const VeryLargeTungstenGlobe = require("./../assets/Very Large Tungsten Globe.png");
const WLabel = require("./../assets/W Label.png");
const WalkingPerson = require("./../assets/Walking Person.png");
const WallMountUtilityLight = require("./../assets/Wall Mount Utility Light.png");
const WallMountUtilityMercuryVapor = require("./../assets/Wall Mount Utility Mercury Vapor.png");
const WallMountUtilitySodiumVapor = require("./../assets/Wall Mount Utility Sodium Vapor.png");
const WhiteOneTwoftPaper = require("./../assets/White 12ft Paper.png");
const XLabel = require("./../assets/X Label.png");
const XMarkerBlack = require("./../assets/X Marker Black.png");
const XMarkerBlue = require("./../assets/X Marker Blue.png");
const XMarkerGreen = require("./../assets/X Marker Green.png");
const XMarkerRed = require("./../assets/X Marker Red.png");
const XMarkerYellow = require("./../assets/X Marker Yellow.png");
const YLabel = require("./../assets/Y Label.png");
const ZLabel = require("./../assets/Z Label.png");

class ObjectImage extends React.Component {
  constructor(props) {
    super(props);
    this.KonvaImageRef = React.createRef();
    this.trRef = React.createRef();
    this.loadedImage;
    this.state = {
      selected: this.props.selected,
      loaded: false,
      loadedImage: null
    };
  }

  componentWillUnmount = () => {
    // required to stop memory leak from async events updating state after component removed from dom
    clearInterval(this.contextMenuTimer);
    this.loadedImage.onload = null;
  };

  render() {
    const {
      updateXYPosition,
      toggleObjectSelected,
      deselectAllObjects,
      updateRotation,
      removeObjectFromDiagram,
      toggleObjectLocked
    } = this.props;

    // image attributes
    let xPos = this.props.x;
    let yPos = this.props.y;
    let rotation = this.props.rotation;

    this.loadedImage = new Image();
    // need to toggle loaded state so that images make it to the page when loaded
    // this conditional is REALLY important, because otherwise it spams state updates whenever a component is moved
    if (this.state.loaded === false) {
      this.loadedImage.onload = () => {
        this.setState({ ...this.state, loaded: true });
      };
    }
    // eval so that we can dynamically select images
    // this should be retooled to be dynamic selection of urls
    // don't try this at home kids
    this.loadedImage.src = eval(this.props.imgName);

    if (this.state.selected === true) {
      this.trRef.current.setNode(this.KonvaImageRef.current);
    }

    return (
      <React.Fragment>
        <KonvaImage
          ref={this.KonvaImageRef}
          x={xPos}
          y={yPos}
          rotation={rotation}
          shadowColor={"gray"}
          shadowOffset={{ x: 0, y: 0 }}
          shadowBlur={50}
          shadowOpacity={0.3}
          image={this.loadedImage}
          draggable={this.props.draggable}
          dragBoundFunc={position => {
            const canvas = document.getElementsByClassName(
              "konvajs-content"
            )[0];
            let { height, width } = canvas.style;
            height = parseInt(height);
            width = parseInt(width);

            // handle left and upper bounds
            if (position.x <= 10) {
              position.x = 10;
            }
            if (position.y <= 10) {
              position.y = 10;
            }

            // lower and outer bounds
            if (position.x >= width - 50) {
              position.x = width - 50;
            }

            if (position.y >= height - 50) {
              position.y = height - 120;
            }

            return {
              x: position.x,
              y: position.y
            };
          }}
          onDragEnd={event => {
            // update the X Y position by sending an action to redux store
            let newXPos = event.currentTarget.attrs.x;
            let newYPos = event.currentTarget.attrs.y;
            const newRotation = event.currentTarget.attrs.rotation;
            updateXYPosition(
              this.props.objectID,
              newXPos,
              newYPos,
              newRotation
            );
            // updateRotation(this.props.objectID, newRotation);
          }}
          onClick={e => {
            this.setState({ selected: !this.state.selected });
          }}
          onDblClick={() => {
            toggleObjectLocked(this.props.objectID);
          }}
          onContextMenu={() => {
            removeObjectFromDiagram(this.props.objectID);
            // prevent the context menu from opening
            window.oncontextmenu = () => {
              this.contextMenuTimer = setTimeout(function() {
                window.oncontextmenu = () => {
                  return true;
                };
              }, 100);
              return false;
            };
          }}
          onTransformEnd={event => {
            const stage = event.currentTarget.parent.parent.attrs;
            const newXPos = event.currentTarget.attrs.x;
            const newYPos = event.currentTarget.attrs.y;
            const newRotation = event.currentTarget.attrs.rotation;
            // if (event.currentTarget.attrs.x <= 0) {
            //   newXPos = 0;
            // }
            // if (event.currentTarget.attrs.x <= 0) {
            //   newYPos = 0;
            // }
            updateXYPosition(
              this.props.objectID,
              newXPos,
              newYPos,
              newRotation
            );
            // updateRotation(this.props.objectID, newRotation);
          }}
        />
        <Transformer
          ref={this.trRef}
          rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315, 360]}
          resizeEnabled={false}
          borderDash={[15, 15]}
          padding={10}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { objects: state.diagram.objects };
};

export default connect(
  mapStateToProps,
  {
    updateXYPosition,
    toggleObjectSelected,
    deselectAllObjects,
    updateRotation,
    removeObjectFromDiagram,
    toggleObjectLocked
  }
)(ObjectImage);
