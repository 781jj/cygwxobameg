//
//  VSGameHtml.h
//  GameBox
//
//  Created by YaoMing on 14-9-24.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface VSGameHtml : NSObject
+ (VSGameHtml *)shareInstance;

- (NSString *)htmlPath:(NSString *)gameId;
@end
