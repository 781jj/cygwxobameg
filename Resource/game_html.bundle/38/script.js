var adOptions = {
    TYPE: "Banner",
    REFRESH_RATE: 60,
    APP_ID: "emer_LostFish_other",
    BG_COLOR: "#000000ff"
};

var ad = Inneractive.createAd(adOptions);
ad.placement("bottom", "center");
ad.addTo(document.getElementById("ad-frame"));