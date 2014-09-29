//
//  VSChannel.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSChannel.h"
#import "VSRequest.h"
#import "VSGameDetailInfo.h"
@implementation VSChannel
- (id)initWithType:(VSChannelType )type
{
    self = [super init];
    if (self) {
        _type = type;
        
        [self loadJson];
      
    }
    return self;
}

- (void)loadData:(VSChannelLoadDataBlock)callback
{
    NSString *parm = @"new";
    if (_type == VSHotChannel) {
        parm = @"hot";
    }
    [VSRequest post:@"123" params:@{@"listType":parm} success:^(NSURLRequest *request, id obj) {
        callback(YES,obj);
    } failed:^(NSURLRequest *request, id obj, NSError *error) {
        callback(NO,obj);
    }];
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
    NSMutableArray *array = [NSMutableArray array];

    if ([json isKindOfClass:[NSArray class]]) {
        [json enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            VSGameDetailInfo *info = [[VSGameDetailInfo alloc] initWithDic:obj];
            [array addObject:info];
        }];
    }
    _gameList = array;
      NSLog(@"json :%@",json);
}


@end
