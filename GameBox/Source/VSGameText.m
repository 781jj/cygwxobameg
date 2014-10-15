//
//  VSGameText.m
//  GameBox
//
//  Created by YaoMing on 14-9-30.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameText.h"
static VSGameText *_gameText = nil;

@interface VSGameText ()

@property(nonatomic,strong)NSArray *infoList;
@end


@implementation VSGameText
- (id)init
{
    self = [super init];
    if (self) {
        [self loadJson];
        
    }
    return self;
}

+ (VSGameText *)shareInstance{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _gameText) {
            _gameText = [[VSGameText alloc] init];
        }
    });
    return _gameText;
}

- (void)loadJson
{
    NSString *jsonFile = [NSBundle pathForResource:@"game" ofType:@"json" inDirectory:[[NSBundle mainBundle]  bundlePath]];
    NSData *data = [NSData dataWithContentsOfFile:jsonFile];
    NSError *error ;
    id json =[NSJSONSerialization
              JSONObjectWithData:data
              options:kNilOptions
              error:&error];
    _infoList = (NSArray *)json;
}


- (NSString *)gameName:(NSString *)gameId
{
    for (NSDictionary *dic in _infoList) {
        if ([[dic objectForKey:@"id"] integerValue] == [gameId integerValue]) {
            return [dic objectForKey:@"name"];
        }
    }
    return nil;
}

- (NSString *)gameAbstract:(NSString *)gameId
{
    for (NSDictionary *dic in _infoList) {
        if ([[dic objectForKey:@"id"] integerValue] == [gameId integerValue]) {
            return [dic objectForKey:@"description"];
        }
    }
    return nil;
}

- (NSString *)gameShare:(NSString *)gameId
{
    for (NSDictionary *dic in _infoList) {
        if ([[dic objectForKey:@"id"] integerValue] == [gameId integerValue]) {
            return [dic objectForKey:@"share"];
        }
    }
    return nil;
}

- (NSString *)gameImageLink:(NSString *)gameId
{
    for (NSDictionary *dic in _infoList) {
        if ([[dic objectForKey:@"id"] integerValue] == [gameId integerValue]) {
            return [dic objectForKey:@"sharelink"];
        }
    }
    return nil;
}

@end
