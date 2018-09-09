modField = int(input("Mod Field \n>"))

passed = True
for x in range (0, modField):
    for y in range(0, modField):
        pairPassed = True
        print("-"*10,"TESTING PAIR:",x,y,"-"*10)
        #Closure
        if (not((x+y)%modField < modField and (x+y)%modField < modField)):
            print("Closure Failed")
            pairPassed = False
            passed = False

        #Communativity
        if (not((x+y)%modField == (y+x)%modField and (x*y)%modField == (y*x)%modField)):
            print("Communativity Failed")
            pairPassed = False
            passed = False

        #Identity
        if (not((x+0)%modField == x%modField and (x*1)%modField == x%modField)):
            print("Identity Failed")
            pairPassed = False
            passed = False

        #Third value needed
        for z in range(0, modField):
            #Associativity
            if (not((x+(y+z))%modField == ((x+y)+z)%modField and (x*(y*z))%modField == ((x*y)*z)%modField)):
                print("Associativity Failed - Z:",z)
                pairPassed = False
                passed = False

            #Distributivity
            if (not((x*(y+z))%modField == ((x*y)+(x*z))%modField)):
                print("Distributivity Failed - Z:",z)
                pairPassed = False
                passed = False

        if (pairPassed):
            print("PASSED")
        else:
            print("FAILED")

    #Inverses
    aInvPassed = False
    mInvPassed = False
    for i in range(0, modField):
        if ((x+i)%modField == 0):
            aInvPassed = True

        if ((x*i)%modField == 1 or x == 0):
            mInvPassed = True
            
    if (not(aInvPassed and mInvPassed)):
        print("Inverses Failed for x value:",x)
        passed = False

print("MOD FIELD",modField,"PASSED:",passed)
