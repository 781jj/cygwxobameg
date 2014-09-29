//
//  VSRequest.h
//  Weimei
//
//  Created by YaoMing on 14-3-13.
//  Copyright (c) 2014年 Vip. All rights reserved.
//

#import <Foundation/Foundation.h>
#define TIME_OUT_INTERVAL 10

typedef void (^VSRespondSucess)(NSURLRequest*,id);
typedef void (^VSRespondFailed)(NSURLRequest*,id,NSError*);

@interface VSRequest : NSObject

+ (void)get:(NSString *)url
         params:(NSDictionary *)params
        success:(VSRespondSucess)success
         failed:(VSRespondFailed)failed;

+ (void)post:(NSString *)url
     params:(NSDictionary *)params
    success:(VSRespondSucess)success
     failed:(VSRespondFailed)failed;
+ (void)request:(NSString *)url
         method:(NSString *)method
         params:(NSDictionary *)params
        success:(VSRespondSucess)success
         failed:(VSRespondFailed)failed;
@end
