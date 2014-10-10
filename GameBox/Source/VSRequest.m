//
//  VSRequest.m
//  Weimei
//
//  Created by YaoMing on 14-3-13.
//  Copyright (c) 2014年 Vip. All rights reserved.
//

#import "VSRequest.h"
#import <AFNetworking/AFHTTPRequestOperationManager.h>

#define SERVER_URL @"http://115.28.76.9:3000"
@implementation VSRequest


+ (NSString *)HTTPBodyWithParameters:(NSDictionary *)parameters
{
    NSMutableArray *parametersArray = [[NSMutableArray alloc]init];
    
    for (NSString *key in [parameters allKeys]) {
        id value = [parameters objectForKey:key];
        if ([value isKindOfClass:[NSString class]]) {
            [parametersArray addObject:[NSString stringWithFormat:@"%@=%@",key,value]];
        }
        
    }
    
    return [parametersArray componentsJoinedByString:@"&"];
}


+ (void)request:(NSString *)url
         method:(NSString *)method
         params:(NSDictionary *)params
        success:(VSRespondSucess)success
         failed:(VSRespondFailed)failed

{
    url = [NSString stringWithFormat:@"%@/%@",SERVER_URL,url];
    
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    manager.responseSerializer = [AFJSONResponseSerializer serializer];
    manager.requestSerializer = [AFJSONRequestSerializer serializer];
    manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript", @"text/plain", nil];
    
    
    if ([[method uppercaseString] isEqualToString:@"POST"]) {
        [manager POST:url   parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
            success(operation.request,responseObject);
        } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
            failed(operation.request,nil,error);
        }];
    }else{
        [manager GET:url   parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
            success(operation.request,responseObject);
        } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
            failed(operation.request,nil,error);
        }];
    }
    
}


+ (void)get:(NSString *)url
         params:(NSDictionary *)params
        success:(VSRespondSucess)success
         failed:(VSRespondFailed)failed;
{
    [VSRequest request:url method:@"GET" params:params success:success failed:failed];
}

+ (void)post:(NSString *)url
      params:(NSDictionary *)params
     success:(VSRespondSucess)success
      failed:(VSRespondFailed)failed
{
    [VSRequest request:url method:@"POST" params:params success:success failed:failed];
}

//
//
//#pragma mark -- connection
//- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
//{
//    
//}
//
//- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
//{
//    
//}
//
//- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
//{
//    
//}
//
//- (void)connectionDidFinishLoading:(NSURLConnection *)connection
//{
//    
//}

@end
