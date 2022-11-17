interface Iprices {
    bannerPrice: number;
    sizing: number;
    grommet: number;
  }
  const prices: Iprices = {
    bannerPrice: 1000,
    sizing: 50,
    grommet: 15
  };
  
  interface IbannerConstructor {
    new (
      bannerWidth: number,
      bannerHeight: number,
      bannerCount: number,
      bannerText: string,
      prices: Iprices
    ): IbannerOrder;
  }
  
  interface IbannerOrder {
    bannerWidth: number;
    bannerHeight: number;
    bannerCount: number;
    bannerArea: number;
    bannerText: string;
    printOnlyCost: number;
    prices: Iprices;
    perimeter: number;
    sizingCost: number;
    grommetCost: number;
    grommetPcs: number;
    bannerMethod(text: string): void;
  }
  
  interface IbannerFn {
    (
      width: number,
      height: number,
      count: number,
      text: string,
      prices: Iprices,
      constructor: IbannerConstructor
    ): BannerOrder;
  }
  
  class BannerOrder implements IbannerOrder {
    bannerWidth: number;
    bannerHeight: number;
    bannerCount: number;
    bannerArea: number;
    bannerText: string;
    printOnlyCost: number;
    prices: Iprices;
    perimeter: number;
    sizingCost: number;
    grommetCost: number;
    grommetPcs: number;
    bannerMethod(text?) {
      console.log(text);
    }
    constructor(
      bannerWidth: number,
      bannerHeight: number,
      bannerCount: number,
      banneText: string,
      prices: Iprices
    ) {
      this.bannerWidth = bannerWidth;
      this.bannerHeight = bannerHeight;
      this.bannerCount = bannerCount;
      this.bannerText = banneText;
      this.bannerArea = this.bannerWidth * this.bannerHeight;
      this.prices = prices;
      this.printOnlyCost = this.bannerArea * this.prices.bannerPrice;
      this.perimeter = (this.bannerWidth + this.bannerHeight) * 2;
      this.sizingCost = this.perimeter * this.prices.sizing;
      this.grommetPcs = this.perimeter / 0.3;
      this.grommetCost = this.grommetPcs * this.prices.grommet;
    }
  }
  
  const bannerFn: IbannerFn = (
    width,
    height,
    count,
    text,
    prices,
    constructor
  ) => {
    return new constructor(width, height, count, text, prices);
  };
  
  const testBanner = bannerFn(1, 2, 1, "test", prices, BannerOrder);
  console.log(testBanner);