//
//  VSLoginMessage.h
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef enum {
    VSTemp = 1,
    VSPara = 2,
    VSFacebook = 3,
    VSTwitter = 4,
}VSSessionType;
@interface VSLoginMessage : NSObject
@property (nonatomic,assign)VSSessionType type;
@end
