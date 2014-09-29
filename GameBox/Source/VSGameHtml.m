//
//  VSGameHtml.m
//  GameBox
//
//  Created by YaoMing on 14-9-24.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameHtml.h"

static VSGameHtml *_gameHtml = nil;
@interface VSGameHtml ()
@property (nonatomic ,copy)NSString *gameHtmlPath;
@end
@implementation VSGameHtml

- (id)init
{
    self = [super init];
    if (self) {
        NSString *home = [[NSBundle mainBundle] resourcePath];
        NSString *bundleFound = [home stringByAppendingPathComponent:@"game_bundle"];
        NSBundle *bundle = [NSBundle bundleWithPath:[bundleFound stringByAppendingPathComponent:@"game_html.bundle"]];
        _gameHtmlPath = [bundle resourcePath];
        
    }
    return self;
}

+ (VSGameHtml *)shareInstance{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _gameHtml) {
            _gameHtml = [[VSGameHtml alloc] init];
        }
    });
    return _gameHtml;
}

- (NSString *)htmlPath:(NSString *)gameId
{
    NSString *gameFoulder = [_gameHtmlPath stringByAppendingPathComponent:gameId];
    return gameFoulder;
}
@end
