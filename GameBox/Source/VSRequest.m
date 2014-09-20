//
//  VSRequest.m
//  Weimei
//
//  Created by YaoMing on 14-3-13.
//  Copyright (c) 2014年 Vip. All rights reserved.
//

#import "VSRequest.h"
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
    NSString *URLFellowString = [@"?"stringByAppendingString:[[self class] HTTPBodyWithParameters:params]];
    
    NSString *finalURLString = [[url stringByAppendingString:URLFellowString]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    NSURL *finalURL = [NSURL URLWithString:finalURLString];
    
    NSMutableURLRequest *URLRequest = [[NSMutableURLRequest alloc]initWithURL:finalURL cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:TIME_OUT_INTERVAL];
    [URLRequest setHTTPMethod:method];
    
    
    [NSURLConnection sendAsynchronousRequest:URLRequest
                                       queue:[[NSOperationQueue alloc] init]
                           completionHandler:^(NSURLResponse *response,NSData *data,NSError *error)
     {
         NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;
         
         if ([data length] >0 && error == nil && [httpResponse statusCode] == 200)
         {
             NSError *serialError = [[NSError alloc] init];
             id json =[NSJSONSerialization
                       JSONObjectWithData:data //1
                       options:kNilOptions
                       error:&serialError];
             if ([json isKindOfClass:[NSDictionary class]]) {
                 NSDictionary *dic = (NSDictionary *)json;
                 if ([dic objectForKey:@"result"]&&[[dic objectForKey:@"result"] intValue] == 1) {
                     success(URLRequest,dic);
                 }else{
                     failed(URLRequest,data,nil);
                 }
             }else{
                 failed(URLRequest,data,nil);
             }
         }else{
             failed(URLRequest,data,error);
         }
     }];
}


+ (void)request:(NSString *)url
         params:(NSDictionary *)params
        success:(VSRespondSucess)success
         failed:(VSRespondFailed)failed;
{
    [VSRequest request:url method:@"GET" params:params success:success failed:failed];
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
